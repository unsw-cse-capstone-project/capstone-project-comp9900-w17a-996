a = ''
a += 'hello,'
print(a)
b = a.split(',')
b.remove('hello')
print(len(b))
# del b[-1]
updated = ','.join(b)
print(updated == '')
