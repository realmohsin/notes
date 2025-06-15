def bubble_sort_1(l):
    for i in range(len(l) - 1, 0, -1):
        for j in range(i):
            if l[j] > l[j + 1]:
                [l[j], l[j + 1]] = [l[j + 1], l[j]]
    print(l)
    return l


def bubble_sort_2(l):
    for i in range(len(l) - 1):
        for j in range(len(l) - 1 - i):
            if l[j] > l[j + 1]:
                [l[j], l[j + 1]] = [l[j + 1], l[j]]
    print(l)
    return l


def bubble_sort_3(l):
    for i in range(1, len(l) - 1):
        for j in range(len(l) - i):
            if (l[j] > l[j + 1]):
                [l[j], l[j + 1]] = [l[j + 1], l[j]]
    print(l)
    return l


bubble_sort_1([12, 32, 13, 24, 10, 55, 3, 2, 15, 45])
bubble_sort_2([12, 32, 13, 24, 10, 55, 3, 2, 15, 45])
bubble_sort_3([12, 32, 13, 24, 10, 55, 3, 2, 15, 45])
