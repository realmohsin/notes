first_list = ['a', 'b', 'c']

print(first_list)
print(first_list[0])
print(first_list[-1])
print(len(first_list))
print('a' in first_list)

for item in first_list:
    print(item)

i = 0

while (i < len(first_list)):
    print(first_list[i])
    i += 1

first_list.append('d')
first_list.extend(['e', 'f'])
first_list.insert(0, 0)
first_list.insert(2, 2)

print(first_list)

first_list.pop() 
removed_item = first_list.pop(1)
print(removed_item)
first_list.remove('c') # will throw error if item not found

index = first_list.index('b') # returns index of item
print(index)

count_of_item = first_list.count('b') # returns number of times item appears in list

first_list.reverse()
print(first_list)

# first_list.sort()
print(first_list)

words = ['Coding', 'Is', 'Fun!']
phrase = ' '.join(words)
print(phrase)

list2 = first_list[:]
list3 = first_list[1:]
list4 = first_list[len(first_list) - 1:]
list5 = first_list[:len(first_list) - 1]
list6 = first_list[1:3]
list7 = first_list[::2]
list8 = first_list[::-1] # in effect reverses

print(list2)
print(list3)
print(list4)
print(list5)
print(list6)
print(list7)
print(list8)

# can set slices to something else within a list
numbers = [1, 2, 3, 4, 5]
numbers[1:3] = ['a', 'b', 'c']

print(numbers) # [1, 'a', 'b', 'c', 4, 5]

# swapping values
names = ["James", "Michelle"]
names[0], names[1] = names[1], names[0]

# comprehension
nums = [1, 2, 3, 4, 5]
doubled_nums = [x * 2 for x in nums]
print(doubled_nums)

multiples_of_ten = [n*10 for n in range(1, 11)]
print(multiples_of_ten)

truthy_or_falsy = [bool(val) for val in [None, 0, '', ]]
print(truthy_or_falsy)

# comprehension with conditional logic
my_numbers = [1, 2, 3, 4, 5, 6]
evens = [num for num in my_numbers if num % 2 == 0]
odds = [num for num in my_numbers if num % 2  == 1]

# syntax changes for if else
doubled_if_odd_halved_if_even = [num * 2 if num % 2 == 1 else num / 2 for num in my_numbers]
print(doubled_if_odd_halved_if_even)


# nested loop comprehension
nested_list = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
nested_loop_comprehended = [[print(val) for val in l] for l in nested_list]
print(nested_loop_comprehended) # [[None, None, None], [None, None, None], [None, None, None]]

board = [[j for j in range(1, 5)] for i in range(4)]
print(board)

tic_tac_toe = [[char.upper() for char in 'xox'] for _ in range(3)]
print(tic_tac_toe)
tic_tac_toe_v2 = [['O' if i % 2 == 0 else 'X' for i in range(1, 4)] for _ in range(3)]
print(tic_tac_toe_v2)

word_list = ['hello', 'there', 'David']
word_nested_list = [[char for char in word] for word in word_list]
print(word_nested_list)

# tuples are a data structure similar to list except they are immutable
# tuples are lighter weight and faster than lists
# useful for protecting data
# some methods return them to you like dictionary.items()
# can have nested tuples, can use slices, many other things
first_tuple = (1, 2, 3, 3, 3)
second_tuple = tuple([1, 2, 3])

# tuples are valid keys in dictionaries
locations = {
    (32.5245, 29.1414): 'Tokyo Office',
    (42.2424, 51.1235): 'New York Office',
    (37.8222, 41.5613): 'San Francisco Office'
}

# looping through tuples same as in lists
names = ('Colt', 'Blue', 'Rusty')
for name in names:
    print(name)

print(names.count('Colt'))
print(names.index('Rusty'))


# sets - list without duplicate values, not ordered
# cannot access items in a set by index because theres no order
s1 = {1, 2, 3}
print(s1)

s2 = set([1, 2, 3, 3])
print(s2)

print(3 in s2)
print(4 in s2)

# can iterate over a set
for item in s2:
    print(item)

s2.add(4)
s2.add(3)
s2.remove(1)
s3 = s2.copy()
print(s3 is s2)
print(s2)
s3.clear()

# some use cases of set
cities = ["New York", "New York", "Los Angeles"]
unique_city_count = len(set(cities))
print(unique_city_count)
unique_cities_list = list(set(cities))

# set union
math_students = {'Jane', 'Bob'}
biology_students = {'Bob', 'Brian'}
students_in_math_or_biology = math_students | biology_students
print(students_in_math_or_biology)

# set intersection
students_in_math_and_biology = math_students & biology_students
print(students_in_math_and_biology)

# set comprehension
s4 = {x % 2 for x in range(10)}
s5 = {char.upper() for char in 'hello'}
print(s4) 
print(s5)

