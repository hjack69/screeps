import re

writingMain = True
altFile = None

# find enclosure, copy to appropriate file
with open('default/main.js', 'r') as template, open('main.js', 'w') as mainF:
    for line in template:
        if (writingMain):
            mainF.write(line)
        else:
            altFile.write(line)
        m1 = re.match(r"\s*//\s*CONCAT\s*(.+)\s*", line)
        m2 = re.match(r"\s*//\s*END\s*(.+)\s*", line)
        if (m1 is not None):
            writingMain = False
            altFile = open(m1.group(1), 'w')
        elif (m2 is not None):
            writingMain = True
            altFile.close()
