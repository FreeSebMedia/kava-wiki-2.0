#!/usr/bin/env python3
"""Generate favicons in multiple sizes from the logo."""

from PIL import Image
import os

# Source logo
source_path = "/home/ubuntu/kava-wiki/client/public/logo-kava-wiki.png"
output_dir = "/home/ubuntu/kava-wiki/client/public"

# Open the source image
img = Image.open(source_path)

# Ensure RGBA mode for transparency
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Favicon sizes needed
sizes = [
    (16, 16, "favicon-16x16.png"),
    (32, 32, "favicon-32x32.png"),
    (48, 48, "favicon-48x48.png"),
    (180, 180, "apple-touch-icon.png"),
    (192, 192, "android-chrome-192x192.png"),
    (512, 512, "android-chrome-512x512.png"),
]

# Generate each size
for width, height, filename in sizes:
    resized = img.resize((width, height), Image.Resampling.LANCZOS)
    output_path = os.path.join(output_dir, filename)
    resized.save(output_path, "PNG")
    print(f"Created: {filename} ({width}x{height})")

# Create ICO file with multiple sizes
ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_images = [img.resize(size, Image.Resampling.LANCZOS) for size in ico_sizes]
ico_path = os.path.join(output_dir, "favicon.ico")
ico_images[0].save(ico_path, format='ICO', sizes=ico_sizes)
print(f"Created: favicon.ico (multi-size)")

print("\nAll favicons generated successfully!")
