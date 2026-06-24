const fs = require('fs');
const { execSync } = require('child_process');

// Read the originally extracted template JSON structure
const templateData = JSON.parse(fs.readFileSync('extracted_template.json', 'utf-8'));

// Read the modified page (current_page.dc.html has all ternary fixes applied)
const modifiedPage = fs.readFileSync('current_page.dc.html', 'utf-8');

// Inject modified page back into the template data
templateData.pages['Defect Intelligence Platform.dc'] = modifiedPage;

// Stringify and escape </script> so the browser doesn't close the script tag early.
// Without this, every </script> inside the page HTML (dc-runtime, component, etc.)
// would be parsed by the browser as closing the outer <script type="__bundler/template">
// tag, causing the remaining JSON content to be rendered as raw visible text with
// literal \n\n\n... sequences on screen.
const newTemplateJson = JSON.stringify(templateData).replace(/<\/script>/g, '<\\/script>');

// Use the first clean commit as the base — take only the content BEFORE the template
// open tag (bundler script + manifest + ext_resources), then append the new template
// and a clean closing. The original files all had unescaped </script> inside the JSON,
// causing the leaked content problem. We ignore everything from the template open tag
// onwards in the original.
const origHtml = execSync('git show 49c74fe:index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf-8');

const OPEN_TAG = '<script type="__bundler/template">';
const openIdx = origHtml.indexOf(OPEN_TAG);
if (openIdx === -1) throw new Error('Could not find __bundler/template open tag in base');

// Take everything before the template open (bundler script, manifest, ext_resources)
const before = origHtml.slice(0, openIdx);

// Build the new HTML with properly-escaped template content and clean ending
const newHtml = before
  + OPEN_TAG + '\n'
  + newTemplateJson
  + '\n  </script>\n</body>\n</html>';

fs.writeFileSync('index.html', newHtml, 'utf-8');

// Verify
const ternaryCount = (newHtml.match(/\{\{[^}]*\?[^}]*:[^}]*\}\}/g) || []).length;
const tStart = newHtml.indexOf(OPEN_TAG) + OPEN_TAG.length;
const tEnd = newHtml.indexOf('</script>', tStart);
const insideTemplate = newHtml.slice(tStart, tEnd);
const hasUnescaped = insideTemplate.includes('</script>');
const afterTemplate = newHtml.slice(tEnd + 9);

console.log('Repacked index.html, size:', newHtml.length);
console.log('Remaining ternaries:', ternaryCount);
console.log('Has s10Display:', newHtml.includes('s10Display'));
console.log('Unescaped </script> inside template:', hasUnescaped, '(must be false)');
console.log('Content after template close:', JSON.stringify(afterTemplate.slice(0, 100)));
