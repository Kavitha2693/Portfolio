import re

files = ['index.html', 'granular_media_downloads.html', 'smart_content_sorting.html']

for file in files:
    print(f"=== ANALYZING {file} ===")
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find inline styles with flex, grid, width, margin
    styles = re.findall(r'style="([^"]*)"', content)
    for style in styles:
        if 'grid' in style or 'flex' in style or 'width' in style:
            # Print if it has fixed px values or large minmax
            if 'px' in style or 'minmax' in style:
                print(style)
