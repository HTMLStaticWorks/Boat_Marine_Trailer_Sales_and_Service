import os
import re

directory = r'd:\SEPT WEBSITES\Boat & Marine Trailer Sales and Service'

# Pages that need the button added or standardised
pages = [
    'blog.html',
    'contact.html',
    'fabrication.html',
]

btn_html = '''\n<!-- BACK TO TOP -->
<button id="back-to-top" aria-label="Back to top"
  class="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl btn-gold flex items-center justify-center shadow-2xl shadow-gold/30 opacity-0 pointer-events-none translate-y-4 transition-all duration-300">
  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
</button>
'''

for filename in pages:
    filepath = os.path.join(directory, filename)
    if not os.path.exists(filepath):
        print(f'SKIP (not found): {filename}')
        continue

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    if 'id="back-to-top"' in content:
        print(f'Already has button: {filename}')
        continue

    # Insert before the first <script src="js/main.js">
    new_content = content.replace('<script src="js/main.js">', btn_html + '<script src="js/main.js">', 1)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Added button: {filename}')
    else:
        print(f'Could not find insertion point in: {filename}')

print('Done.')
