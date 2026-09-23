import os, re
for f in os.listdir('.'):
    if f.endswith('.html'):
        with open(f, 'r', encoding='utf-8') as file:
            content = file.read()
        p_classes = set(re.findall(r'<p class="([^"]+)"', content))
        for c in p_classes:
            print(f'{f}: {c}')
