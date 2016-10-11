import re

inds = {}
lines = []

# find enclosure, copy to appropriate file
with open('default/main.js', 'r') as template:
    for i, line in enumerate(template):
        lines.append(line)
        m1 = re.match(r"\s*//\s*CONCAT\s*(.+)\s*", line)
        m2 = re.match(r"\s*//\s*END\s*(.+)\s*", line)
        if (m1 is not None):
            inds[m1.group(1)] = [i]
        elif (m2 is not None):
            inds[m2.group(1)].append(i)

for key, value in inds.items():
    with open(key, 'w') as out:
        for i in range(value[0]+1, value[1]):
            out.write(lines[i])
