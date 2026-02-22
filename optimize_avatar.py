#!/usr/bin/env python3
"""
Script to optimize avatar image for web display
Reduces file size while maintaining quality
"""

from PIL import Image
import os

# Paths
input_path = "/Users/theoverdelhan/Documents/AUTRES/theov07.github.io/images/IMG_8782.PNG"
output_path = "/Users/theoverdelhan/Documents/AUTRES/theov07.github.io/images/avatar.jpg"

# Open image
print(f"Opening image: {input_path}")
img = Image.open(input_path)
print(f"Original size: {img.size}, Mode: {img.mode}")

# Convert to RGB if necessary (for JPEG)
if img.mode in ('RGBA', 'LA', 'P'):
    # Create white background
    background = Image.new('RGB', img.size, (255, 255, 255))
    if img.mode == 'P':
        img = img.convert('RGBA')
    background.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
    img = background

# Resize to appropriate dimensions (sidebar width is typically 200-300px)
max_size = (400, 400)
img.thumbnail(max_size, Image.Resampling.LANCZOS)
print(f"Resized to: {img.size}")

# Save with optimization
img.save(output_path, 'JPEG', quality=85, optimize=True)
print(f"Saved optimized image to: {output_path}")

# Check file sizes
original_size = os.path.getsize(input_path) / (1024 * 1024)
new_size = os.path.getsize(output_path) / (1024 * 1024)
print(f"\nOriginal: {original_size:.2f} MB")
print(f"Optimized: {new_size:.2f} MB")
print(f"Reduction: {((original_size - new_size) / original_size * 100):.1f}%")
