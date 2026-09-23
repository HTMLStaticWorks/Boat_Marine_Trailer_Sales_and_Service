import os
import re

html_files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in html_files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Let's fix the text wrapping and add hanging indent to the contact list
    # Find the contact us ul
    
    # 1. Replace the wrapping text in Address
    content = content.replace('4821 Harbor Drive<br />Panama City, FL 32401', '4821 Harbor Drive<br />Panama City, FL&nbsp;32401')
    
    # 2. Replace the wrapping text in Hours
    content = content.replace('Saturday: 9AM – 4PM', 'Saturday: 9AM&nbsp;&ndash;&nbsp;4PM')
    content = content.replace('Mon–Fri: 8AM – 6PM', 'Mon&ndash;Fri: 8AM&nbsp;&ndash;&nbsp;6PM')
    
    # 3. Add -ml-7 to the ul of the Contact Us section so the text aligns with the heading
    pattern = r'(<h3 class="font-semibold text-white text-sm uppercase tracking-wider mb-4">Contact Us</h3>\s*)<ul class="space-y-3">'
    replacement = r'\1<ul class="space-y-3 lg:-ml-7">' # using lg:-ml-7 so it only hangs on desktop where there is gutter space
    content = re.sub(pattern, replacement, content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Footer fixed in all HTML files.")
