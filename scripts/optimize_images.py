"""Rebuild delivery images; originals stay untouched. Requires Pillow."""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]

def export(source, destination, widths):
    original = ImageOps.exif_transpose(Image.open(ROOT / source))
    for width in widths:
        image = original.copy()
        image.thumbnail((width, round(width * original.height / original.width)))
        path = ROOT / f'{destination}-{width}.webp'
        path.parent.mkdir(parents=True, exist_ok=True)
        image.save(path, 'WEBP', quality=84, method=6)
        print(f'{path.relative_to(ROOT)}: {image.width} × {image.height}, {path.stat().st_size:,} bytes')

export('VAN/IMG_5883.jpeg', 'VAN/assets/van', [640, 1200, 1800])
export('VAN/9CE7DEE0-17AB-4CD9-A994-E125F4F07048_1_105_c.jpeg', 'VAN/assets/interior', [480, 768])
export('VAN/E4AD0C03-9FA0-4496-8D18-6E72089CECAF_1_105_c.jpeg', 'VAN/assets/evening', [480, 768])
export('VAN/ad2b5bd0-c6a8-44db-9cb7-501f25091b9e 2.jpeg', 'VAN/assets/night', [480, 1200])
export('VAN/melt_n_go_logo.png', 'VAN/assets/logo', [96, 192])
export('Portofolio/avatar.png', 'Portofolio/avatar', [240])
for source, target, size in [('favicon.png', 'assets/favicon.png', 64), ('apple_dock_icon.png', 'assets/apple-touch-icon.png', 180)]:
    image = Image.open(ROOT / source)
    image.thumbnail((size, size))
    image.save(ROOT / target, optimize=True)
