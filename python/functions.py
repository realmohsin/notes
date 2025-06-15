import sys
from random import random


def say_hi():
    print('Hi!')


say_hi()


def square_of_7():
    return 7**2


ans = square_of_7()
print(ans)


def flip_coin():
    r = random()
    if r > 0.5:
        return 'Heads'
    else:
        return 'Tails'


print(flip_coin())


# default parameters
def speak(animal="dog"):
    noises = {"dog": "woof", "pig": "oink", "duck": "quack", "cat": "meow"}
    noise = noises.get(animal)
    if noise:
        return noise
    return "?"

# keyword arguments - specifying arguments as key value pairs instead of
# relying on parameter order


def full_name(first, last):
    return f"Your name is {first} {last}"


full_name('Colt', 'Steele')  # normally
full_name(first='Colt', last='Steele')  # using keyword arguments


# have to specify that you're dealing with global variable beforehand in function
# don't have to specify if you're just accessing but i think you still should
# will only throw error if you are accessing first, then changing a global variable
# if you change a global variable first, it'll be assumed you're actually creating a local variable with same name
# I think its best to always specify global keyword (?)
total = 0


def increment():
    global total
    local_total = total + 1
    # total = 3
    print('global total: ', total)
    print('local_total: ', local_total)


increment()
print('printing total from global scope: ', total)

# similar to global keyword, nonlocal keyword can be used to modify
# variables in parent function scope


def outer():
    count = 0

    def inner():
        nonlocal count
        count += 1
        return count
    return inner()

# explore the scoping more especially in longer chains
# explore whether where its defined is what is important or where it's called
# closures in python?

# documenting functions


def say_hello():
    """Prints 'hello' to stdout"""
    print('hello')


print(say_hello.__doc__)  # can access documentation note like this
print([].pop.__doc__)  # can use on python's builtin's


def check(n=None):
    return n


print(check())

# gathering args into tuple


def sum_all_nums(*nums):
    sum = 0
    for num in nums:
        sum += num
    return sum

# gathering keyword args into dictionary


def fav_colors(**kwargs):
    print(kwargs)


fav_colors(colt='purple', ruby='red', ethel='teal')

# all these special features of parameters requires an order if they are all used at once:
# 1. paramters
# 2. *args
# 3. default parameters
# 4. **kwargs


# unpacking data structures to pass to functions
nums = [2, 4, 5]
sum_all_nums(*nums)


def display_names(first, second):
    print(f"{first} says hello to {second}")


names = {'first': 'colt', 'second': 'rusty'}

display_names(**names)  # because of python's keyword argument syntax for functions, you can unpack dictionaries into a normal function's arguments if the parameter names match the keys of the dictionary


# lambda is an anonymous one line function that can be stored in a variable

def square1(num):
    return num * num


def square2(num): return num * num


print(square1.__name__)  # functions have names
print(square2.__name__)  # lambda's dont have names

# map built in - take fn and iterable, calls fn for each element in iterable
# map returns a map object which can only be iterated over once, so they
# should immediately be turned into a list

numbers = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, numbers))

print(doubled)


# filter built in - take fn and iterable, calls fn for each element in
# iterable, returns filter object with elements that passed True from fn

l = [1, 2, 3, 4]
evens = list(filter(lambda x: x % 2 == 0, l))
print(evens)

# all built in - returns True if all items are truthy
print(all(['hello', '']))

# any built in - return True if at least one item is truthy
print(any(['hello', '']))

# use generator expression (a lighter weight version of a list) if you're just iterating once and not going to use the iterable later
# generator expressions take up less memory - less bytes
list_comp = sys.getsizeof([x * 10 for x in range(1000)])
gen_exp = sys.getsizeof(x * 10 for x in range(1000))

print("To do the same thing, it takes...")
print(f"List Comprehension: {list_comp} bytes")
print(f"Generator Expression: {gen_exp} bytes")

# come back to the above at a later time to understand better

# sorted built in - returns a new sorted list from the items in an iterable
more_numbers = [5, 1, 8, 2]
sorted_more_numbers = sorted(more_numbers)
print(sorted_more_numbers)

# sorted takes a key keyword argument to allow sorting by a dict's key
users = [{'username': 'samuel'}, {'username': 'max'}, {'username': 'alan'}]
sorted_users = sorted(users, key=lambda user: user['username'])

# max built in - return the largest item in an iterable or the largest of two or more arguments
# min built in - return the smallest item in an iterable or the smallest
# of two or more arguments
max([3, 4, 1, 2])
max((1, 2, 3, 4))
max('awesome')
names = ['Arya', 'Samson', 'Dora', 'Tim']
max(names, key=lambda n: len(n))  # length of the name with the most characters
