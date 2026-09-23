import os, glob, re

for f in glob.glob('*.html'):
    if f in ['login.html', 'signup.html']: continue
    
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove the theme toggle button from the mobile header
    # It looks like:
    # <button data-toggle-theme aria-label="Toggle theme" class="...">
    #   <span data-theme-icon>☀️</span>
    # </button>
    # <button id="mobile-menu-toggle" ...>
    
    pattern = r'<button data-toggle-theme[^>]*>\s*<span data-theme-icon>☀️</span>\s*</button>(\s*<button id="mobile-menu-toggle")'
    new_content = re.sub(pattern, r'\1', content, flags=re.DOTALL)
    
    if content != new_content:
        with open(f, 'w', encoding='utf-8') as file:
            file.write(new_content)
        print(f"Updated {f}")
