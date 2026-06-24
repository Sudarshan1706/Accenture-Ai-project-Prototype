const fs = require('fs');

// We use the originally extracted template JSON to prevent parsing the corrupted one in the HTML.
const templateData = JSON.parse(fs.readFileSync('extracted_template.json', 'utf-8'));

// Read the modified page
const modifiedPage = fs.readFileSync('page_Defect Intelligence Platform.dc.html', 'utf-8');

// Inject modified page back into the template data
// NOTE: Key is 'Defect Intelligence Platform.dc' NOT '...dc.html'
templateData.pages['Defect Intelligence Platform.dc'] = modifiedPage;

// Stringify to generate the new bundle data. IMPORTANT: Escape </script> so it doesn't break the HTML script tag.
const newTemplateJson = JSON.stringify(templateData).replace(/<\/script>/g, '<\\/script>');

// Read original HTML
const origHtml = fs.readFileSync('index.html', 'utf-8');

// Replace the bundler/template script contents safely with a replacer function
const newHtml = origHtml.replace(/<script type="__bundler\/template">[\s\S]*?<\/script>/, () => `<script type="__bundler/template">\n${newTemplateJson}\n  </script>`);

fs.writeFileSync('index.html', newHtml);
console.log('Successfully repacked index.html safely!');
