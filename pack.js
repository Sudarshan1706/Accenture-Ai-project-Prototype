const fs = require('fs');

// We use the originally extracted template JSON to prevent parsing the corrupted one in the HTML.
const templateData = JSON.parse(fs.readFileSync('extracted_template.json', 'utf-8'));

// Read the modified page (current_page.dc.html has all ternary fixes applied)
const modifiedPage = fs.readFileSync('current_page.dc.html', 'utf-8');

// Inject modified page back into the template data
// NOTE: Key is 'Defect Intelligence Platform.dc' NOT '...dc.html'
templateData.pages['Defect Intelligence Platform.dc'] = modifiedPage;

// Stringify and escape </script> so it doesn't break the HTML script tag.
const newTemplateJson = JSON.stringify(templateData).replace(/<\/script>/g, '<\\/script>');

// Read original HTML (use committed version via git show to avoid corrupted local state)
const origHtml = fs.readFileSync('index.html', 'utf-8');

// Position-based extraction to find the REAL template script block boundaries.
// We cannot use a lazy regex because the JSON content contains </script> substrings.
const OPEN_TAG = '<script type="__bundler/template">';
const CLOSE_TAG = '</script>';

const openIdx = origHtml.indexOf(OPEN_TAG);
if (openIdx === -1) throw new Error('Could not find __bundler/template open tag');

// Find the closing </script> that belongs to this script block.
// The JSON content has <\/script> (with backslash) so the real close tag is plain </script>.
// Search forward from just after the open tag for the first plain </script>.
// Since the JSON stores escaped <\/script>, plain </script> = the actual tag boundary.
let searchFrom = openIdx + OPEN_TAG.length;
const closeIdx = origHtml.indexOf(CLOSE_TAG, searchFrom);
if (closeIdx === -1) throw new Error('Could not find __bundler/template close tag');

const before = origHtml.slice(0, openIdx);
const after = origHtml.slice(closeIdx + CLOSE_TAG.length);

const newHtml = before + OPEN_TAG + '\n' + newTemplateJson + '\n  ' + CLOSE_TAG + after;

fs.writeFileSync('index.html', newHtml, 'utf-8');

// Verify
const check = fs.readFileSync('index.html', 'utf-8');
const ternaryCount = (check.match(/\{\{[^}]*\?[^}]*:[^}]*\}\}/g) || []).length;
console.log('Repacked index.html, size:', newHtml.length);
console.log('Remaining ternaries in template:', ternaryCount);
console.log('Has s10Display:', check.includes('s10Display'));
