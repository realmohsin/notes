# keys are almost always numbers or strings

instructor = {
    'name': 'Colt',
    'owns_dog': True,
    'num_courses': 4,
    44: 'his favorite number!'
}

print(instructor)

# dict
my_dictionary = dict(name = 'Mike', age = 5)
print(my_dictionary)

instructor_name = instructor['name']
print(instructor_name)

owns_dog_key = 'owns_dog'
instructor_owns_dog = instructor[owns_dog_key]
print(instructor_owns_dog)

# iterate over dictionary
for key in instructor:
    print('----')
    print(key)

# get iterable collection of values
values = instructor.values()
print(values)
for val in instructor.values():
    print(val)

# get iterable collection of keys (basic syntax of iterating over dictionary does the same thing?)
keys = instructor.keys()
print(keys)
for key in instructor.keys():
    print(key)

# get iterable collection of tuples for each key, value pair
items = instructor.items()
print(items)
for key, val in instructor.items():
    print(key, val)

# in keyword tests for key existence
print('address' in instructor)


# some methods
instructor_copy = instructor.copy()
print(instructor_copy is instructor)
print(instructor_copy == instructor)

instructor_copy.clear() # turns into empty dictionary

# for creating new dictionary with default values
new_user = {}.fromkeys(['name', 'score', 'email'], None)

# .get similar to accessing but will not throw error if key doesn't exist, will instead return None
print(instructor.get('name'))
print(instructor.get('location'))

# to remove based on key
instructor.pop('owns_dog') # return value
instructor.popitem() # removes random(?) key-value pair

# update will update (and override) keys and values in a dictionary with another set of key value pairs
first = dict(a = 1, b = 2, c = 3, d = 4, e = 5)
second = { 'a': 2 }
second.update(first)

# dictionary comprehension
# {__:__ for __ in __}

numbers = dict(first=1, second=2, third=3)
squared_numbers = {key: value ** 2 for key, value in numbers.items()}
print(squared_numbers)

dictionary1 = {num: num**2 for num in [1, 2, 3, 4, 5]}
print(dictionary1)

string1 = 'ABC'
string2 = '123'
combo = {string1[i]: string2[i] for i in range(len(string1))}
print(combo)

# conditional logic in dictionary comprehension
parity_map = {str(i) if i % 2 == 0 else i : 'even' if i % 2 == 0 else 'odd' for i in range(101)}
print(parity_map)