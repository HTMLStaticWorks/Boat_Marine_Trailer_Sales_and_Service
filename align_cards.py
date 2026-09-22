import os
import re

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    orig = content
    
    # Image 1 (Pricing cards)
    # product-card -> add flex flex-col h-full
    content = re.sub(
        r'(class="product-card bg-navy-700 rounded-2xl overflow-hidden border border-white/8 hover:border-gold/30)(")',
        r'\1 flex flex-col h-full\2',
        content
    )
    # the p-6 container inside product-card -> flex flex-col flex-1
    content = re.sub(
        r'(<div class="p-6">)',
        r'<div class="p-6 flex flex-col flex-1">',
        content
    )
    # buttons container -> add mt-auto
    content = re.sub(
        r'(<div class="flex gap-3)(">)([\s]*<a href="[^"]+" class="flex-1 btn-gold)',
        r'\1 mt-auto\2\3',
        content
    )

    # Image 2 (Trailer Lineup)
    # card -> add flex flex-col h-full
    content = re.sub(
        r'(class="group block card-hover bg-navy-700 rounded-2xl overflow-hidden border border-white/8 hover:border-gold/30)(")',
        r'\1 flex flex-col h-full\2',
        content
    )
    # body -> flex flex-col flex-1
    content = re.sub(
        r'(<div class="p-5">)(\s*<div class="flex items-center justify-between mb-2">)',
        r'<div class="p-5 flex flex-col flex-1">\2',
        content
    )
    # View Range link -> add mt-auto
    content = re.sub(
        r'(<div class="mt-4 text-gold text-xs font-semibold uppercase tracking-wider)',
        r'<div class="mt-auto text-gold text-xs font-semibold uppercase tracking-wider pt-4',
        content
    )

    # Image 3 (About Features Grid)
    # card -> flex flex-col h-full
    content = re.sub(
        r'(<div class="bg-navy-700 rounded-2xl p-6 border border-white/8 hover:border-gold/30 card-hover transition-all")()',
        r'<div class="bg-navy-700 rounded-2xl p-6 border border-white/8 hover:border-gold/30 card-hover transition-all flex flex-col h-full"',
        content
    )
    # the text paragraph -> flex-1 (to push anything below, but actually there's nothing below, so making the card flex-col h-full is enough to make them equal height)
    # Actually, just making them h-full makes the cards equal height in CSS grid.
    
    # Image 4 (Service Cards)
    # card -> flex flex-col h-full
    content = re.sub(
        r'(<div class="bg-navy-700 rounded-2xl overflow-hidden border border-white/8 hover:border-gold/30 transition-all card-hover")()',
        r'<div class="bg-navy-700 rounded-2xl overflow-hidden border border-white/8 hover:border-gold/30 transition-all card-hover flex flex-col h-full"',
        content
    )
    # body -> flex flex-col flex-1
    content = re.sub(
        r'(<div class="p-6">)(\s*<h3 class="font-display font-700)',
        r'<div class="p-6 flex flex-col flex-1">\2',
        content
    )
    # text-gold link -> add mt-auto
    content = re.sub(
        r'(<p class="text-gold text-sm font-semibold)(">)([\s\S]*?</p>)',
        r'\1 mt-auto pt-4\2\3',
        content
    )

    if content != orig:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {filepath}")

for f in os.listdir(r'd:\SEPT WEBSITES\Boat & Marine Trailer Sales and Service'):
    if f.endswith('.html'):
        process_file(os.path.join(r'd:\SEPT WEBSITES\Boat & Marine Trailer Sales and Service', f))
