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

# Validated organic selection: departure, living space, storage and rear bar.
export('VAN/organique/WhatsApp Image 2026-10-14 at 10.40.04 (1).jpeg', 'VAN/assets/departure', [640, 1200, 1800])
export('VAN/organique/WhatsApp Image 2026-10-14 at 10.40.19 (6).jpeg', 'VAN/assets/living', [480, 768, 1200])
export('VAN/organique/WhatsApp Image 2026-10-14 at 10.40.19 (4).jpeg', 'VAN/assets/storage', [480, 900])
export('VAN/organique/WhatsApp Image 2026-10-14 at 10.40.19 (2).jpeg', 'VAN/assets/bar', [480, 900])
export('VAN/melt_n_go_logo.png', 'VAN/assets/logo', [96, 192])
export('Portofolio/avatar.png', 'Portofolio/avatar', [240])
for source, target, size in [('favicon.png', 'assets/favicon.png', 64), ('apple_dock_icon.png', 'assets/apple-touch-icon.png', 180)]:
    image = Image.open(ROOT / source)
    image.thumbnail((size, size))
    image.save(ROOT / target, optimize=True)
