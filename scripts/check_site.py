"""Check static pages, local URLs, anchor targets and image dimensions. No dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote

ROOT = Path(__file__).resolve().parents[1]
PAGES = [ROOT / 'index.html', ROOT / 'VAN/van.html', ROOT / 'Portofolio/index.html']
errors = []

class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.ids, self.links, self.h1 = path, set(), [], 0
        self.feed(path.read_text())
    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if 'id' in a:
            if a['id'] in self.ids: errors.append(f'{self.path.name}: duplicate ID {a["id"]}')
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'img':
            if 'alt' not in a: errors.append(f'{self.path.name}: missing image alt')
            if not all(key in a for key in ['width', 'height']): errors.append(f'{self.path.name}: image dimensions missing')
        for key in ['src', 'href']:
            if a.get(key): self.links.append(a[key])
        if a.get('srcset'):
            self.links.extend(item.strip().split()[0] for item in a['srcset'].split(','))
        if a.get('target') == '_blank' and 'noopener' not in a.get('rel', ''):
            errors.append(f'{self.path.name}: missing noopener')

pages = {path: Page(path) for path in PAGES}
for path, page in pages.items():
    if page.h1 != 1: errors.append(f'{path.name}: expected one h1, got {page.h1}')
    for link in page.links:
        url = urlsplit(link)
        if url.scheme or url.netloc: continue
        dest = (path.parent / unquote(url.path)).resolve() if url.path else path
        if not dest.exists(): errors.append(f'{path.name}: missing {link}')
        elif url.fragment and dest in pages and url.fragment not in pages[dest].ids:
            errors.append(f'{path.name}: missing anchor {link}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} pages; local assets, srcsets, anchors, image dimensions, external-link isolation and heading counts.')
