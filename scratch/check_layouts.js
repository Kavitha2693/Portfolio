const fs = require('fs');

const files = ['index.html', 'granular_media_downloads.html', 'smart_content_sorting.html'];

files.forEach(file => {
    console.log(`=== ANALYZING ${file} ===`);
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Find style tags and inline styles
        const inlineStyles = content.match(/style="([^"]*)"/g) || [];
        inlineStyles.forEach(styleAttr => {
            const style = styleAttr.match(/style="([^"]*)"/)[1];
            if (style.includes('grid') || style.includes('flex') || style.includes('width') || style.includes('padding') || style.includes('margin')) {
                if (style.includes('px') || style.includes('minmax')) {
                    console.log(`  Inline: ${style}`);
                }
            }
        });
    } catch (err) {
        console.error(err);
    }
});
