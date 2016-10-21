import re

# if regular expression matches, handle inserting appropriate file after line
with open('main.js', 'r') as template, open('default/main.js', 'w') as output:
    for line in template:
        output.write(line)
        m = re.match(r"(\s*)// *CONCAT *(.+) *", line)
        if (m is not None):
            with open(m.group(2), 'r') as cfile:
                for cline in cfile:
                    output.write(m.group(1)+cline)
