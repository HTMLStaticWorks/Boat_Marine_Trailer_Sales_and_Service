import os
import re

directory = r'd:\SEPT WEBSITES\Boat & Marine Trailer Sales and Service'

css_block_search = r'/\* Preserve white text on dark image backgrounds \(Hero, CTA, etc\) \*/.*?html:not\(\.dark\) section\[style\*="background-image"\] \.text-gray-400 \{ color: #9ca3af !important; \}'

css_block_replace = '''/* Preserve white text on dark image backgrounds (Hero, CTA, etc) */
    html:not(.dark) .preserve-white .text-white, html:not(.dark) .hero-bg .text-white, html:not(.dark) .cta-bg .text-white, 
    html:not(.dark) .service-bg .text-white, html:not(.dark) .fab-bg .text-white,
    html:not(.dark) section[style*="background-image"] .text-white { color: #ffffff !important; }
    
    html:not(.dark) .preserve-white .text-gray-100, html:not(.dark) .hero-bg .text-gray-100, html:not(.dark) .cta-bg .text-gray-100,
    html:not(.dark) .service-bg .text-gray-100, html:not(.dark) .fab-bg .text-gray-100,
    html:not(.dark) section[style*="background-image"] .text-gray-100 { color: #f3f4f6 !important; }

    html:not(.dark) .preserve-white .text-gray-300, html:not(.dark) .hero-bg .text-gray-300, html:not(.dark) .cta-bg .text-gray-300,
    html:not(.dark) .service-bg .text-gray-300, html:not(.dark) .fab-bg .text-gray-300,
    html:not(.dark) section[style*="background-image"] .text-gray-300 { color: #d1d5db !important; }
    
    html:not(.dark) .preserve-white .text-gray-400, html:not(.dark) .hero-bg .text-gray-400, html:not(.dark) .cta-bg .text-gray-400,
    html:not(.dark) .service-bg .text-gray-400, html:not(.dark) .fab-bg .text-gray-400,
    html:not(.dark) section[style*="background-image"] .text-gray-400 { color: #9ca3af !important; }'''

for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, count = re.subn(css_block_search, css_block_replace, content, flags=re.DOTALL)
        
        if count > 0:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated CSS in {filename}')
        else:
            print(f'CSS block not found in {filename}')
