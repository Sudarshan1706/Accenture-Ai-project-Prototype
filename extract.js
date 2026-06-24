const fs = require('fs');

const fileContent = fs.readFileSync('uploads/defect-intelligence-platform.html', 'utf-8');

const templateMatch = fileContent.match(/<script type="__bundler\/template">([\s\S]*?)<\/script>/);
if (templateMatch) {
  const templateData = JSON.parse(templateMatch[1]);
  fs.writeFileSync('uploads/extracted_template.json', JSON.stringify(templateData, null, 2));
  
  // also extract each page to a separate HTML file for easier viewing and editing
  for (const pageId in templateData.pages) {
    fs.writeFileSync(`uploads/page_${pageId}.html`, templateData.pages[pageId]);
  }
  console.log('Successfully extracted templates to uploads/extracted_template.json and individual page html files');
} else {
  console.error('Could not find __bundler/template script');
}
