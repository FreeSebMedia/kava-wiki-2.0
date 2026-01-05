#!/usr/bin/env python3
"""Generate Open Graph image using hero background with text overlay - matching homepage style."""

from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import os

# Paths
hero_path = "/home/ubuntu/kava-wiki/client/public/images/hero-home.jpg"
output_path = "/home/ubuntu/kava-wiki/client/public/og-image.png"

# OG image dimensions
OG_WIDTH = 1200
OG_HEIGHT = 630

# Load and resize hero image
hero = Image.open(hero_path)
hero = hero.convert('RGB')

# Calculate crop to get 1200x630 from center
hero_ratio = hero.width / hero.height
og_ratio = OG_WIDTH / OG_HEIGHT

if hero_ratio > og_ratio:
    new_width = int(hero.height * og_ratio)
    left = (hero.width - new_width) // 2
    hero = hero.crop((left, 0, left + new_width, hero.height))
else:
    new_height = int(hero.width / og_ratio)
    top = (hero.height - new_height) // 2
    hero = hero.crop((0, top, hero.width, top + new_height))

hero = hero.resize((OG_WIDTH, OG_HEIGHT), Image.Resampling.LANCZOS)

# Create overlay for text readability
overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (0, 0, 0, 0))
draw_overlay = ImageDraw.Draw(overlay)

# Stronger gradient overlay
for y in range(OG_HEIGHT):
    if y < 80:
        alpha = 100
    elif y > 500:
        alpha = 100
    else:
        alpha = 150
    draw_overlay.rectangle([(0, y), (OG_WIDTH, y + 1)], fill=(0, 0, 0, alpha))

hero_rgba = hero.convert('RGBA')
hero_with_overlay = Image.alpha_composite(hero_rgba, overlay)
draw = ImageDraw.Draw(hero_with_overlay)

# Load fonts with Noto fonts
font_title = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoSerif-Bold.ttf", 85)
font_subtitle = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf", 26)
font_badge = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf", 14)
font_url = ImageFont.truetype("/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf", 18)

# Colors
white = (255, 255, 255)
cream = (250, 247, 240)

# ===== PIPER METHYSTICUM BADGE =====
badge_text = "PIPER METHYSTICUM"
badge_bbox = draw.textbbox((0, 0), badge_text, font=font_badge)
badge_width = badge_bbox[2] - badge_bbox[0]
badge_height = badge_bbox[3] - badge_bbox[1]
badge_x = (OG_WIDTH - badge_width) // 2
badge_y = 80

badge_padding_x = 16
badge_padding_y = 8
badge_rect = [
    badge_x - badge_padding_x,
    badge_y - badge_padding_y,
    badge_x + badge_width + badge_padding_x,
    badge_y + badge_height + badge_padding_y
]

badge_overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (0, 0, 0, 0))
badge_draw = ImageDraw.Draw(badge_overlay)
badge_draw.rounded_rectangle(badge_rect, radius=6, fill=(45, 74, 45, 230))
hero_with_overlay = Image.alpha_composite(hero_with_overlay, badge_overlay)
draw = ImageDraw.Draw(hero_with_overlay)
draw.text((badge_x, badge_y), badge_text, font=font_badge, fill=cream)

# ===== MAIN TITLE - "Wurzel der Ruhe" - LARGE ELEGANT SERIF =====
title_text = "Wurzel der Ruhe"
title_bbox = draw.textbbox((0, 0), title_text, font=font_title)
title_width = title_bbox[2] - title_bbox[0]
title_height = title_bbox[3] - title_bbox[1]
title_x = (OG_WIDTH - title_width) // 2
title_y = 180

# Multiple shadow layers for depth
for offset in [(6, 6), (5, 5), (4, 4), (3, 3), (2, 2), (1, 1)]:
    draw.text((title_x + offset[0], title_y + offset[1]), title_text, font=font_title, fill=(0, 0, 0))
draw.text((title_x, title_y), title_text, font=font_title, fill=white)

# ===== SUBTITLE LINE 1 =====
subtitle_text = "Das umfassende Wissensportal über die pazifische Entspannungswurzel."
subtitle_bbox = draw.textbbox((0, 0), subtitle_text, font=font_subtitle)
subtitle_width = subtitle_bbox[2] - subtitle_bbox[0]
subtitle_x = (OG_WIDTH - subtitle_width) // 2
subtitle_y = 340

draw.text((subtitle_x + 2, subtitle_y + 2), subtitle_text, font=font_subtitle, fill=(0, 0, 0))
draw.text((subtitle_x, subtitle_y), subtitle_text, font=font_subtitle, fill=cream)

# ===== SUBTITLE LINE 2 =====
subtitle2_text = "Wissenschaftlich fundiert, kulturell verwurzelt."
subtitle2_bbox = draw.textbbox((0, 0), subtitle2_text, font=font_subtitle)
subtitle2_width = subtitle2_bbox[2] - subtitle2_bbox[0]
subtitle2_x = (OG_WIDTH - subtitle2_width) // 2
subtitle2_y = 385

draw.text((subtitle2_x + 2, subtitle2_y + 2), subtitle2_text, font=font_subtitle, fill=(0, 0, 0))
draw.text((subtitle2_x, subtitle2_y), subtitle2_text, font=font_subtitle, fill=cream)

# ===== WEBSITE URL =====
url_text = "kavakava.wiki"
url_bbox = draw.textbbox((0, 0), url_text, font=font_url)
url_width = url_bbox[2] - url_bbox[0]
url_height = url_bbox[3] - url_bbox[1]
url_x = (OG_WIDTH - url_width) // 2
url_y = OG_HEIGHT - 55

url_padding_x = 18
url_padding_y = 8
url_rect = [
    url_x - url_padding_x,
    url_y - url_padding_y,
    url_x + url_width + url_padding_x,
    url_y + url_height + url_padding_y
]

url_overlay = Image.new('RGBA', (OG_WIDTH, OG_HEIGHT), (0, 0, 0, 0))
url_draw = ImageDraw.Draw(url_overlay)
url_draw.rounded_rectangle(url_rect, radius=16, fill=(45, 74, 45, 220))
hero_with_overlay = Image.alpha_composite(hero_with_overlay, url_overlay)
draw = ImageDraw.Draw(hero_with_overlay)
draw.text((url_x, url_y), url_text, font=font_url, fill=white)

# Save
final_image = hero_with_overlay.convert('RGB')
final_image.save(output_path, 'PNG', quality=95)

print(f"OG image created: {output_path}")
print(f"Dimensions: {OG_WIDTH}x{OG_HEIGHT}")
