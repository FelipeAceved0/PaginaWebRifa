const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist) {
  files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      filelist = walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(path.join(dir, file));
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  
  // Fix type imports
  content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['\"]\.\.?\/(?:components\/)?types['\"]/g, 'import type { $1 } from \'../types\'');
  
  // Also specific replacements
  content = content.replace(/import\s+React.*?;\n/g, '');
  
  if (f.includes('PurchaseSummary')) {
    content = content.replace(/import\s+\{.*?useNavigate.*?\}\s+from\s+'react-router-dom';\n/g, '');
  }
  
  if (f.includes('PaymentResult')) {
    content = content.replace(/ArrowLeft,\s*/g, '');
  }
  
  if (f.includes('api.ts')) {
     content = content.replace(/purchaseId:\s*string/g, 'purchaseId: string | undefined');
  }
  
  fs.writeFileSync(f, content);
});
