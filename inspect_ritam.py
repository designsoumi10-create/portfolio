import re

with open('ritam_source.html', 'r', encoding='utf-8') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]*src=[\'"]([^\'"]+)[\'"]', html)
print('Script src files:', scripts)

links = re.findall(r'<link[^>]*href=[\'"]([^\'"]+)[\'"]', html)
print('Link href files:', [l for l in links if 'css' in l or 'font' in l])

canvases = re.findall(r'<canvas[^>]*>', html)
print('Canvases:', canvases)

# Check inline script contents
inline_scripts = re.findall(r'<script(?![^>]*src=)[^>]*>(.*?)</script>', html, re.DOTALL)
print(f'Inline script count: {len(inline_scripts)}')
for i, s in enumerate(inline_scripts):
    print(f'--- Inline script {i+1} ({len(s)} chars) ---')
    print(s[:500])
