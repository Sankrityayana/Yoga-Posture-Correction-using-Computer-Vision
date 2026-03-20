const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend/src/utils/idealPoses.js');
let content = fs.readFileSync(file, 'utf8');

// Known corrupted strings from ANSI-UTF8 double encoding
const fixes = [
  { bad: 'à¤¤à¤¾à¤¡à¤¾à¤¸à¤¨', good: 'ताडासन' },
  { bad: 'à¤¤à¥à¤°à¤¿à¤•à¥‹à¤£à¤¾à¤¸à¤¨', good: 'त्रिकोणासन' }, // Just to be safe we'll use regex if needed, wait, I can just replace by pose id!
  { bad: 'â€”', good: '—' },
  { bad: 'Â±', good: '±' }
];

// However, fixing all the gibberish is hard because I don't know exactly what all 8 corrupted words look like in double-UTF8.
// Better approach: Since we know the pose id and the exact Sanskrit text, let's just replace the `sanskrit: '...'` line dynamically.

const sanskritMap = {
  'tadasana': 'ताडासन',
  'trikonasana': 'त्रिकोणासन',
  'vrikshasana': 'वृक्षासन',
  'warrior1': 'वीरभद्रासन १',
  'warrior2': 'वीरभद्रासन २',
  'downwarddog': 'अधोमुखश्वानासन',
  'bhujangasana': 'भुजङ्गासन',
  'balasana': 'बालासन'
};

for (const [id, sanskrit] of Object.entries(sanskritMap)) {
  const regex = new RegExp(`(id:\\s*'${id}',\\s*\\n\\s*name:\\s*'.*?',\\s*\\n\\s*sanskrit:\\s*')[^']+(')`, 'g');
  content = content.replace(regex, `$1${sanskrit}$2`);
}

// Fix em-dash and plus-minus globally
content = content.replace(/â€”/g, '—').replace(/Â±/g, '±');

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully fixed Sanskrit strings and em-dashes!');
