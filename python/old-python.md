To use python command in git bash:
```bash
echo 'alias python="winpty python.exe"' >> .bashrc
source .bashrc
```

to quit python REPL, type quit()

int + float = float
int / int = float

comments start with #

// - is integer division, returns just the whole number of times the divisor goes into the dividend


Naming Conventions:
- CAPITAL_SNAKE_CASE refers to constants
- UpperCamelCase refers to a class
- __no_touchy__ are supposed to be left alone or private


some data types -
bool - True or False values (bools are capitalized - True and False)
int - an integer
str - a sequence of Unicode characters
list - an ordered sequence of values of other data types
dict - a collection of key: values, eg. {"first_name": "Real", "last_name": "Mohsin"}

python is dynamically typed

None is a special value that represents emptyness

interpolation to insert into strings - F-Strings or .format
F-Strings modern way - f'hello {variable}'
interpolation only way to insert numbers into strings?

Falsy values are empty objects (?), empty strings, None, and zero

or, and, not - logical operators

```python
age = 21
not ((age >= 2 and age <= 8) or age >= 65) # look into logical operations, how does the not get distributed?
```

is vs ==
== checks if the values are the same
`is` checks if the pointers are pointing to the same thing in memory or not
(does this mean == can be used to compare shapes of lists and dicts)

range(start, end) up to end - 1, if only one argument, its used as end and start is set to 0 
3rd parameter used for how to create range from start to finish, used for custom incrementing, or decrementing. Decrementing doesn't work normally without using this parameter:
```python
for x in range(10, 5, -1):
  print(x) # will print 10 9 8 7 6


- conditional

```python
name = input('Type in your name: ')

 if name == 'Arya':
    print('Valar Morgulis')
elif name == 'Jon':
    print('You know nothing')
else:
    print('Carry on')
```


- sample command line program
```python
kms = input('How many kilometers did you cycle today? ')
miles = float(kms) / 1.6
miles = round(miles, 2)
print(f'Your {kms}kms is {miles} miles!')
```

- loops
```python
# for x in range(10):
#     print(x)

for y in range(10, 5, -1):
    print(y)

my_range = range(5)
print(my_range)

for x in 'hello world':
    print(x)

print('---')

for i in range(1, 21):
    if i == 4 or i == 13:
        print(f'{i} is UNLUCKY!')
    elif i % 2 == 0:
        print(f'{i} is even')
    else:
        print(f'{i} is odd')


print('---')

j = 1

while j < 21:
    if j == 4 or j == 13:
        print(f'{j} is UNLUCKY!')
    elif j % 2 == 0:
        print(f'{j} is even')
    else:
        print(f'{j} is odd')
    j += 1


for i in range(9):
    s = ''
    for j in range(i + 1):
        s += '\U0001f600'
    print(s)
```

