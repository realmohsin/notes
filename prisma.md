A primitive concept in SQL is a table. A table is a collection of rows and columns. Each row represents a single entity, and each column represents a property of that entity.

One feature of Prisma is the ORM which stands for "Object Relational Mapper". This allows you to interact with your database using JavaScript objects and function calls instead of SQL. (🦺 And the best part is it's all typesafe!).

Another feature of Prisma is its schema language. This is a language that allows you to define your database schema in a way that is more human readable and easier to manage than SQL. It allows you to define relationships between tables, and it allows you to define the types of each column. It also helps you to manage migrations (changes in the schema).

Another feature of Prisma is a CLI that you can use to manage your database with your schema. So you can convert this schema into SQL and run it against your database to create the tables. You can also use it to generate the ORM client.
To generate the SQL and run it on your database, you'll run:
npx prisma db push - takes your models and pushes them unto your database

And if you already have a database, you can go the reverse direction: generate the schema from the database:
npx prisma db pull

Another great feature of Prisma is the ability to view and edit your database using a web interface. This is called Prisma Studio. You can run it with:
npx prisma studio

Models in a database often have relationships, like objects in our code or even things in real life. There are a few types of relationships.

One to One
```prisma
model Person {
  id             String          @unique @default(cuid())
  name           String
  socialSecurity SocialSecurity?
}

model SocialSecurity {
  id       String  @unique @default(cuid())
  number   String
  person   Person @relation(fields: [personId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  personId String @unique
}
```
You'll notice the @relation attribute on the SocialSecurity model. This configures the relationship between the two models with referential actions.
The fields argument specifies which fields in the model are used to refer to the other model. The references argument specifies which fields in the other model are used to refer to this model. The personId field is used to refer to the Person model and is called a foreign key.
The onDelete and onUpdate arguments specify what happens when the referenced model is deleted or updated. In this case, we're saying that if a Person is deleted or updated, the SocialSecurity should be deleted or updated as well.



One To Many
A person has many phone numbers, a phone number belongs to one person. For example:
```prisma
model Person {
  id           String        @unique @default(cuid())
  name         String
  phoneNumbers PhoneNumber[]
}

model PhoneNumber {
  id       String @unique @default(cuid())
  number   String
  person   Person @relation(fields: [personId], references: [id], onDelete: Cascade, onUpdate: Cascade)
  personId String
}
```
In this case, the biggest difference is that the personId field is not declared as @unique. This is because a person can have many phone numbers, so the same personId can appear multiple times in the PhoneNumber model. And on the Person model, the phoneNumbers field is declared as an array of PhoneNumber models, because a person can have many phone numbers.


Many To Many
A blog post has many tags, a tag has many blog posts. For example:
```prisma
model Post {
  id    String @id @default(cuid())
  title String
  tags  Tag[]
}

model Tag {
  id    String @id @default(cuid())
  name  String
  posts Post[]
}
```
You may have noticed something interesting about this relationship configuration... There's no @relationship configuration! There's no postId or tagId on these models to relate them to each other. This is due to a limitation in relational models. You cannot represent a many-to-many relationship between two database tables.

It even handles cascading updates/deletes and creates indexes for us.


Avoid polymorphism in databases
instead of making a single Image model and using that for both the User and Note models, we're going to have UserImage and NoteImage models that each hold the content type, file bytes, and alt text.
This may feel like we're duplicating code and schema, which we definitely are, but if you consider the future possibilities, it will be much easier for us to add a NotePDF model later without impacting other models than to try and get all polymorphic with a single generic File model (polymorphism and databases don't mix well).

We'll be storing our images directly in the database. Turns out, in some cases, serving files from SQLite can be 35% faster than the file system (and can be more space efficient as well)! Even in situations where that's not the case, it's certainly not much slower. So while you definitely can bring in another service to manage storing the images for you, or store it to a persistent volume, starting out with the images in the database is a perfectly reasonable approach for many applications.


Now we want to create a new image/file. The tricky bit here is Prisma studio represents files as base64 encoded strings which is fine.

```typescript
import { PrismaClient } from '@prisma/client'
import fs from 'node:fs'

const prisma = new PrismaClient()

const firstNote = await prisma.note.findFirst()

if (!firstNote) {
	throw new Error('You need to have a note in the database first')
}

await prisma.note.update({
	where: { id: firstNote.id },
	data: {
		images: {
			create: [
				{
					altText: 'an adorable koala cartoon illustration',
					contentType: 'image/png',
					blob: await fs.promises.readFile(
						'./tests/fixtures/images/kody-notes/cute-koala.png',
					),
				},
				{
					altText: 'a cartoon illustration of a koala in a tree eating',
					contentType: 'image/png',
					blob: await fs.promises.readFile(
						'./tests/fixtures/images/kody-notes/koala-eating.png',
					),
				},
			],
		},
	},
})
```

Migrations
When you have non-breaking changes, for example, adding a new table and just adding an extra field to an existing model for the relationship, then you can just use npx prisma db push. 


What if we decided we wanted to make the name required? Or what if we decided we want to make the username unique? These are "breaking schema changes" which necessitate a data migration.
Managing these data migrations is tricky business and often involves custom SQL or an intrusive ORM that may not quite fit with what you need done so you end up having to workaround the limitations.
Prisma takes the middle ground approach. Instead of completely hiding the details of the migration, Prisma generates the SQL for the migration and saves it to disk. From there you are free to alter it as needed.
This SQL file should be committed to your git repository and deployed alongside your app. That way you can track database changes over time. Prisma will also keep track of which migrations have been applied to your database so you don't have to worry about that. (It creates a very small table in your database for this). So when you deploy your app, you simply run npx prisma migrate deploy and Prisma will take care of the rest.de

When to use Migrate vs Push
The short answer is you use push when you're experimenting with schema changes and migrate when you're ready to commit to a schema change.

In practice, this means you should adopt a "widen then narrow" strategy for schema migrations. This is a pretty common practice, but here's a simple example of how this works (each step here is an individual deploy):

Widen app to consume A or B
Widen db to provide A and B and the app to write to both A and B
Narrow app to consume B and only write to B
Narrow db to provide B
So, let's say that today your app allows users to provide a "name" and you want to change that to firstName and lastName instead. Here's how you'd do that (again, each of these steps end in a deploy):

Widen app to consume firstName and lastName or name. So all new code that references the firstName and lastName fields should fallback to the name field and not error if the firstName and lastName fields don't exist yet, which it won't at this point.
Widen db to provide firstName and lastName and name. So the name field should be populated with the firstName and lastName fields. You can do this as part of the migration SQL script that you run. The easiest way to do this is to generate the migration script to add the fields using prisma migrate and then modify the script to copy the existing data in the name field to the firstName field (maybe with the help of VSCode Copilot 😅).
Narrow app to consume firstName and lastName by only writing to those fields and removing the fallback to the name field.
Narrow db to provide firstName and lastName by removing the name field. So now you can remove the name field from the db schema.
By following this strategy, you can ensure zero downtime deploys and schema migrations.




So for quick development you can use - `npx prisma db push` to sync your schema file changes to the database. 
When you're ready to commit those changes, you run `npx prisma migrate dev` to create a migration file. Everytime you run `npx prisma migrate dev` a new migration file will be created within a migration file history, similar to commiting in git. Then when connected to a production database you can run `npx prisma migrate deploy` and it will run the migration sql files against the production database. The production database will have a table of hte migration history so just the new migration files will be executed to catch the production database up to history of migration files. 

My questions: How does the data react to various schema changes? 



Great! We can now commit this migration file and as we make changes to the data model we can continue committing migration files and feel confident that our production database can follow along.
We won't cover actually deploying this to a production environment in this workshop, but it really amounts to running npx prisma migrate deploy during your deployment process. By following the good practices we've gone over, this should be a non-event.

Seeding data means to create data in your database that you can use to test your application. It's also useful for initializing your database with data that you know you'll need.

 typically you want this script to delete all the data in your database and then re-create it from scratch. Another benefit of writing a seed script is you can set the IDs of your records so every time you run the seed script you can have some predictability in the IDs of your records which makes it easier to navigate around the app consistently.

 The easiest way to seed production data is to include it in your migration script. You literally edit the migration.sql file that prisma generates for you to have it create the data you need.

 Prisma's CLI has built-in support for a seed script. It will run your seed script after running dev migrate subcommand npx prisma migrate reset. You can also run it manually with npx prisma db seed.
But first it must be configured in the package.json:
```json
"prisma": {
  "seed": "npx tsx prisma/seed.ts"
}
```
Whatever the seed property is set to will be what is run.


`npx prisma migrate reset` - resets the database and replays all migrations. Does adding prisma.seed config to package.json run the seed command on every prisma migrate command?


seed file should delete all existing data first:
```typescript
await prisma.user.deleteMany()
```

Nested Writes
```typescript
await prisma.note.create({
	data: {
		id: 'd27a197e',
		title: 'Basic Koala Facts',
		content:
			'Koalas are found in the eucalyptus forests of eastern Australia. They have grey fur with a cream-coloured chest, and strong, clawed feet, perfect for living in the branches of trees!',
		ownerId: kody.id,
		images: {
			create: [
				{
					altText: 'an adorable koala cartoon illustration',
					contentType: 'image/png',
					blob: await fs.promises.readFile(
						'./tests/fixtures/images/kody-notes/cute-koala.png',
					),
				},
				{
					altText: 'a cartoon illustration of a koala in a tree eating',
					contentType: 'image/png',
					blob: await fs.promises.readFile(
						'./tests/fixtures/images/kody-notes/koala-eating.png',
					),
				},
			],
		},
	},
})
```
Notice that we're actually creating two images while we create the note? This is called a nested query.
This generates more optimal SQL queries than running multiple queries.
And it also manages connecting the foreign keys for us. Without using nested queries, we have to do that ourselves:
```typescript
await prisma.note.update({
	where: { id: firstNote.id },
	data: {
		images: {
			connect: [{ id: newImage1.id }, { id: newImage2.id }],
		},
	},
})
```

There is also option to connect when creating records.


Faker.js
A better way is to use a library like faker to
Generate massive amounts of fake (but realistic) data for testing and development.
Faker has a good guide to get you an introduction to how it works in the usage docs. But here's a quick snippet from that to give you an idea:

For random number of records:
```typescript
import { faker } from '@faker-js/faker'

const numberOfThings = faker.number.int({ min: 1, max: 10 })

// then you can use that number to generate an array of things:
const things = Array.from({ length: numberOfThings }, () => {
	// create your thing...
})

// if async:
const thingsAsync = await Promise.all(
	Array.from({ length: numberOfThings }, async () => {
		// create your async thing...
	}),
)

```

For unique data, use library - enforce-unique:
```typescript
const uniqueEmailEnforcer = new UniqueEnforcer()

const email = uniqueEmailEnforcer.enforce(() => faker.internet.email())
```

utility:
```typescript
const reviewTitle = faker.lorem.words(10).slice(0, 50)
```


Querying Data

With SQL, you query data using the SELECT statement. The SELECT statement is one of the most complex statements in SQL, but it's also the most powerful. It's used to query data from one or more tables. The SELECT statement is composed of several clauses, but the two most important are the FROM and WHERE clauses.

When using HMR in development, to avoid re-creating the Prisma Client, which creates a database connection upon creation, we can do:
```typescript
import { PrismaClient } from '@prisma/client'

if (!global.prisma) {
	global.prisma = new PrismaClient()
}

export const prisma = global.prisma
```
Get record by ID or unique Identifier
```typescript
const user = await prisma.user.findUnique({
	select: { id: true, name: true, email: true },
	where: { id: 1 },
})
```

Nested Select
```typescript
await prisma.ship.findUnique({
	where: { id },
	select: {
		id: true,
		name: true,
		reviews: {
			select: { id: true, body: true, rating: true },
		},
	},
})
```

Updating Data
Here's how you insert data into a table in SQL:
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);
```

here's how you would update existing data in SQL:
```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

And you can even do what's called an "upsert" which is an update or insert depending on whether the data already exists:
```sql
INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...)
ON CONFLICT (column1)
DO UPDATE SET column2 = value2, column3 = value3, ...;
```

To delete data from a table:
```sql
DELETE FROM table_name
WHERE condition;
```

Prisma has utilities for all of these operations:
```typescript
// update the rocket with id "1" to have the name "Falcon 9"
await prisma.rocket.update({
	where: { id: 1 },
	data: { name: 'Falcon 9' },
})

// update the rocket with the id "1" to have the name "Falcon 9" if it exists,
// otherwise create a new rocket with the name "Falcon 9"
await prisma.rocket.upsert({
	where: { id: 1 },
	update: { name: 'Falcon 9' },
	create: { name: 'Falcon 9' },
})

await prisma.rocket.delete({
	where: { id: 1 },
})
```
Prisma with SQLite supports updateMany and deleteMany. So if your where clause matches more than one record, your update will apply to every record that matches. However, upsertMany is not supported.
You can also perform nested queries for these as well.


Transactions
A transaction is a set of database actions that should all be rolled back if any one of them fails. 

SQL for transaction:
```sql
BEGIN TRANSACTION;
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
COMMIT;
```

Prisma syntax for transactions:
```typescript
await prisma.$transaction([
	prisma.rocket.update({
		where: { id: 1 },
		data: { name: 'Falcon 9' },
	}),
	prisma.rocket.update({
		where: { id: 2 },
		data: { name: 'Falcon Heavy' },
	}),
])
```
There is a callback API instad of array API, you can look at docs. In either case, it's the same. If any of the queries fail, the entire transaction will fail and none of the changes will be applied.

Caching and IDs
Our images are cached with Cache-Control headers, so if an image is updated, we could end up with a stale image in the browser cache. To fix this, we can change the ID of the image if the user updates it. So even though the database normally creates IDs for us, we're going to need to create our own ID in this case. We'll be using the module @paralleldrive/cuid2 to generate our cuid in this case.

utility: notIn
```typescript
await prisma.noteImage.deleteMany({
  where: {
    noteId: params.noteId,
    id: { notIn: imageUpdates.map(i => i.id)}
  }
})
```

Nested Update:
```typescript
await prisma.note.update({
  select: { id: true },
  where: { id: params.noteId },
  data: {
    title,
    content,
    images: {
      deleteMany: { id: { notIn: imageUpdates.map(i => i.id) }},
      updateMany: imageUpdates.map(updates => ({
        where: { id: updates.id },
        data: { ...updates, id: updates.blob ? cuid() : updates.id }
      })),
      create: newImages
    }
  }
})
```

We can use prisma.$queryRaw to execute raw SQL queries. This is a great escape hatch for when you need it. It even supports parameterized queries, so you can avoid SQL injection attacks:
```typescript
const ships = await prisma.$queryRaw`
SELECT name, username from user WHERE user.id = ${params.userId};
`
// the interpolated string is auto-escaped.
```

The tricky bit here is that the return value of this query is going to be any because Prisma has no way of knowing what the shape of the data is going to be.
We could definitely just cast this to the shape we expect, but the problem with that is if we change the query, we may forget to update the type. So instead we can use zod to define a schema for the data we expect to get back and then validate it:
```typescript
import { z } from 'zod'

const CitySchema = z.object({
	id: z.number(),
	name: z.string(),
})
const CitiesSchema = z.array(CitySchema)

const rawCities = await prisma.$queryRaw`...`

const result = CitiesSchema.safeParse(rawCities)

if (result.success) {
	const cities = result.data
} else {
	console.error(result.error)
}
```
Or we can just cast and make sure to update:
```typescript
type Report = {
	id: string
	name: string
	number: number
}
type Reports = Array<Report>

const reports = (await prisma.$queryRaw`
SELECT id, name, number
FROM ...
`) as Reports
```

Theres a new feature in prisma 5.19.0 that allows you turn raw SQL and get typed results back - prisma.$queryRawTyped.


Examples:
```typescript
const searchTerm1 = '%great%'
const searchTerm2 = '%awesome%'
await prisma.$queryRaw`
  SELECT * FROM "Review" WHERE "text" LIKE ${searchTerm1} OR "text" LIKE ${searchTerm2};
`
```
 you'll be getting the search term from the query string and it could be null, so you'll want to fallback to '' if it is.


 When doing joins in sql, what determines what's on the left and what's on the right is what you're selecing from. 


Order By SQL:
```sql
SELECT id, title, content from Review ORDER BY updatedAt LIMIT 30;
```

order by example:
```typescript
const rawUsers = await prisma.$queryRaw`
...
`
```

An enormous number of performance optimizations in web applications can be best accomplished by optimizing database queries.

An index on a database column is extra data (managed by the database) that the database can reference when performing queries rather than looking at the individual records themselves. It has massive potential to speed up your queries by a huge margin.

Symlinks are used by indexes to group records together.


 when you create an index, there are two things you should think about:
It takes more space
It takes more time to add new records
In a typical web application you almost always will want to optimize for speed of reads over storage cost and speed of writes. This is because most web applications are read-heavy. That is, there are many more reads than writes. And storage costs are relatively minimal.

Regarding storage space, there are many factors that go into the storage space taken up by an index, but most of the time it will be less than the size of the column it's indexing. But that's a good metric to measure the size of your index against. For multi-column indexes, you may think it's the size of the sum of the two columns, but it's likely going to be quite a bit less. 

Additionally, users are typically more forgiving of a "save" operation taking a bit more time than a "search" operation.

Oh, and it turns out that adding an index can sometimes speed up writes as well.

By default, Prisma indexes the unique fields of each table (like the primary key field id). This is great because we very often look up a record by its ID. But there are other things we should consider indexing by default as well.

(My  question: What does it mean to index on unique fields? Because they are unique you can't group them into similar buckets? Aren't you forced to look through each one till you find it?)

Foreign keys are a great example. If you have a User table and a Post table and each post has a userId column, you should index the userId column on the Post table. This will make it much faster to find all the posts for a given user.

By default, you should probably index foreign keys for fields which are not unique.

Some databases (MySQL) will index foreign keys by default, but SQLite, Postgres, and SQL Server do not. Prisma strives to be consistent with our database so that's why it doesn't index foreign keys by default, but it's more often than not a good choice.

Prisma automatically creates an index on fields that have @unique on them, so if your foreign key has @unique, then you don't need to add an index for that one.

Another thing to consider indexing, is anything that appears in your WHERE clause or ORDER BY clause. If you're filtering or sorting by a column, you can probably speed up the query quite a bit by adding an index on that column. And in some cases you'll want to add a multi-column index (for the "find by X, then sort those by Y scenario").

Unfortunately this is more of an art than a science (otherwise databases and ORMs would just do it for us). But there are some things you can do to identify why a particular query is slow.
Watch out for memory or CPU spikes. When the database is doing a full table scan, it's going to be using a lot of memory and CPU. If you see spikes in either of those, it's a good sign that you need to add an index in one of your queries.

One way to find and understand optimization opportunities is to use EXPLAIN QUERY PLAN to see what the database plans to do for the query. This will show you what indexes it's using (if any at all). Things to watch out for in the output are "SCAN" without an index. This means the database is going to look at every single record in the table. For tables with very few records this doesn't matter, but for tables with millions of records, this can be very slow.

```sql
EXPLAIN QUERY PLAN SELECT * FROM user WHERE name = 'Alice';
```
no index output:
```sql
QUERY PLAN
`--SCAN user
```

index output:
```
QUERY PLAN
`--SEARCH user USING INDEX User_username_key (username=?)
```

When you want to manually add an index, you can use the @@index attribute:
```prisma
model Starport {
  id         String      @id @default(cuid())
  name       String
  locationId String
  location   Location @relation(fields: [locationId], references: [id])

	// non-unique foreign key
  @@index([locationId])
}
```

multi-column index:
```prisma
model Starport {
  id         String      @id @default(cuid())
  name       String
  locationId String
  location   Location @relation(fields: [locationId], references: [id])

  @@index([locationId, name])
}
```

In new project when initializing with:
`npx prisma init --db --output ./generated/prisma`
I was asked to authenticate using either google or github. I chose github, from which my email was extracted. Then a schema.prisma file was created and a database url was created and put in .env file. THen in my console.prisma.com i found the created project even though the account was not created using github auth. I'm guessing prisma postgres console accounts are unique by email and whether i picked github or google, all they wouldve looked for was email and either make new acct or add to existing acct with given email. 

