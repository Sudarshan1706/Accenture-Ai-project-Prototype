const fs = require('fs');
const { execSync } = require('child_process');

// Read the originally extracted template JSON structure
const templateData = JSON.parse(fs.readFileSync('extracted_template.json', 'utf-8'));

// Read the modified page (current_page.dc.html has all ternary fixes applied)
const modifiedPage = fs.readFileSync('current_page.dc.html', 'utf-8');

// Inject modified page back into the template data
templateData.pages['Defect Intelligence Platform.dc'] = modifiedPage;

// Stringify and escape </script> so the browser doesn't close the script tag early.
const newTemplateJson = JSON.stringify(templateData).replace(/<\/script>/g, '<\\/script>');

// Read the base HTML from git — the committed version has inner </script> properly
// escaped as <\/script>, so the first plain </script> IS the real closing tag.
// Using the local checkout risks getting a version where git CRLF conversion or a
// previous botched repack has left unescaped </script> inside the JSON, which causes
// pack.js to split at the wrong place and append 789KB of leaked content.
const origHtml = execSync('git show HEAD~1:index.html', { maxBuffer: 10 * 1024 * 1024 }).toString('utf-8');

const OPEN_TAG = '<script type="__bundler/template">';
const CLOSE_TAG = '</script>';

const openIdx = origHtml.indexOf(OPEN_TAG);
if (openIdx === -1) throw new Error('Could not find __bundler/template open tag');

// The committed base has <\/script> (with backslash) inside the JSON, so the first
// plain </script> after the open tag is the actual closing tag of the script block.
const searchFrom = openIdx + OPEN_TAG.length;
const closeIdx = origHtml.indexOf(CLOSE_TAG, searchFrom);
if (closeIdx === -1) throw new Error('Could not find __bundler/template close tag');

const before = origHtml.slice(0, openIdx);
const after = origHtml.slice(closeIdx + CLOSE_TAG.length);

const newHtml = before + OPEN_TAG + '\n' + newTemplateJson + '\n  ' + CLOSE_TAG + after;

fs.writeFileSync('index.html', newHtml, 'utf-8');

// Verify
const ternaryCount = (newHtml.match(/\{\{[^}]*\?[^}]*:[^}]*\}\}/g) || []).length;
const withSlash = newHtml.indexOf('<\\/script>');
const noSlashInTemplate = (() => {
  const tStart = newHtml.indexOf(OPEN_TAG) + OPEN_TAG.length;
  const tEnd = newHtml.indexOf(CLOSE_TAG, tStart);
  return newHtml.slice(tStart, tEnd).indexOf('</script>') > -1;
})();

console.log('Repacked index.html, size:', newHtml.length);
console.log('Remaining ternaries:', ternaryCount);
console.log('Has s10Display:', newHtml.includes('s10Display'));
console.log('Has <\\/script> (escaped):', withSlash > -1);
console.log('Has unescaped </script> inside template:', noSlashInTemplate, '(should be false)');
console.log('Leaked content after template?', (() => {
  const tStart = newHtml.indexOf(OPEN_TAG) + OPEN_TAG.length;
  const tClose = newHtml.indexOf(CLOSE_TAG, tStart);
  const afterTemplate = newHtml.slice(tClose + CLOSE_TAG.length).trim();
  return afterTemplate.length > 50 ? afterTemplate.slice(0, 100) + '...' : afterTemplate;
})());
