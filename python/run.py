class Man:
    def __init__(self, name):
        self.name = name

    def shout(self):
        print(f'my name is {self.name}')

    @classmethod
    def make_twin(cls, name):
        return cls(name)

    @staticmethod
    def say_hello():
        print('hello from static method')


man_1 = Man('Alex')

man_2 = man_1.make_twin('Alexei')

print(man_2.name)

man_2.say_hello()
Man.say_hello()

man_3 = Man.make_twin('Ernie')
print(man_3.name)
