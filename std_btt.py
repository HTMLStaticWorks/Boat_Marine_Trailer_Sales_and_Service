import os
import re

directory = r'd:\SEPT WEBSITES\Boat & Marine Trailer Sales and Service'

pages = [
    'about.html',
    'home2.html',
    'service.html',
]

canonical = '''<button id="back-to-top" aria-label="Back to top"
  class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-2xl shadow-gold/30 opacity-0 pointer-events-none translate-y-4 transition-all duration-300">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>'''

# Match any variant of the back-to-top button
pattern = re.compile(
    r'<button[^>]*id="back-to-top"[^>]*>.*?</button>',
    re.DOTALL
)

for filename in pages:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f'SKIP: {filename}')
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    new_content, count = pattern.subn(canonical, content)

    if count > 0 and new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Standardised: {filename}')
    elif count == 0:
        print(f'No button found: {filename}')
    else:
        print(f'Already canonical: {filename}')

print('Done.')
