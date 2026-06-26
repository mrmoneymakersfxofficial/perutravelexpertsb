#!/usr/bin/env python3
"""
Update gold colors across the entire codebase to match the desired rich gold from Image 1.

Color analysis:
  Image 1 (desired): H=44.3°, S=52.8%, L=51.8% — rich, saturated warm gold
  Image 2 (current): H=39.2°, S=29.9%, L=50.8% — muted, desaturated bronze

New palette:
  --gold:       #D4A843 (primary gold, was #C5A55A)
  --gold-light: #E8CC6A (light gold, was #DCC99A)
  dark hover:   #B89020 (hover/gradient end, was #A8883D)
  favicon:      #D4A843 (was #D6B37F)

RGBA equivalents:
  rgba(197,165,90,...)  → rgba(212,168,67,...)   (primary)
  rgba(183,155,86,...)  → rgba(184,144,32,...)   (dark)
"""

import os
import re

BASE_DIR = "/home/z/my-project/src"
PUBLIC_DIR = "/home/z/my-project/public"

# Color mappings: old → new
HEX_REPLACEMENTS = [
    # Primary gold (most common)
    ("#C5A55A", "#D4A843"),
    # Dark gold (hover states, gradient partner)
    ("#A8883D", "#B89020"),
    # Light gold
    ("#DCC99A", "#E8CC6A"),
    # Favicon gold
    ("#D6B37F", "#D4A843"),
    # Case-insensitive variants (uppercase)
    ("#c5a55a", "#D4A843"),
    ("#a8883d", "#B89020"),
    ("#dcc99a", "#E8CC6A"),
    ("#d6b37f", "#D4A843"),
]

# RGBA mappings: (old_rgb, new_rgb)
RGBA_REPLACEMENTS = [
    # Primary gold rgba(197,165,90,...) → rgba(212,168,67,...)
    (197, 165, 90, 212, 168, 67),
    # Dark gold rgba(183,155,86,...) → rgba(184,144,32,...)
    (183, 155, 86, 184, 144, 32),
]

def replace_rgba_in_text(text):
    """Replace all rgba() color values matching our patterns."""
    for old_r, old_g, old_b, new_r, new_g, new_b in RGBA_REPLACEMENTS:
        # Match rgba(R, G, B, alpha) patterns
        pattern = rf'rgba\(\s*{old_r}\s*,\s*{old_g}\s*,\s*{old_b}\s*,'
        replacement = f'rgba({new_r},{new_g},{new_b},'
        text = re.sub(pattern, replacement, text)
    return text

def process_file(filepath):
    """Process a single file, applying all gold color replacements."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
    except (UnicodeDecodeError, PermissionError):
        return False, 0

    original = content

    # Apply hex replacements
    for old_hex, new_hex in HEX_REPLACEMENTS:
        content = content.replace(old_hex, new_hex)

    # Apply RGBA replacements
    content = replace_rgba_in_text(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        # Count changes
        changes = sum(1 for a, b in zip(original, content) if a != b)
        return True, changes
    return False, 0

def main():
    total_files = 0
    total_changes = 0

    # Process all source files
    for root, dirs, files in os.walk(BASE_DIR):
        for filename in files:
            if filename.endswith(('.tsx', '.ts', '.css', '.jsx', '.js')):
                filepath = os.path.join(root, filename)
                changed, changes = process_file(filepath)
                if changed:
                    total_files += 1
                    total_changes += changes
                    rel_path = os.path.relpath(filepath, BASE_DIR)
                    print(f"  Updated: src/{rel_path}")

    # Process public files (favicon.svg, etc.)
    for root, dirs, files in os.walk(PUBLIC_DIR):
        for filename in files:
            if filename.endswith(('.svg', '.html', '.css', '.js')):
                filepath = os.path.join(root, filename)
                changed, changes = process_file(filepath)
                if changed:
                    total_files += 1
                    total_changes += changes
                    rel_path = os.path.relpath(filepath, PUBLIC_DIR)
                    print(f"  Updated: public/{rel_path}")

    print(f"\nSummary: {total_files} files updated, ~{total_changes} character changes")

if __name__ == "__main__":
    main()