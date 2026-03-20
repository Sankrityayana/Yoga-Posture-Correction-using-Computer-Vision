const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'frontend/src/utils/idealPoses.js');
let content = fs.readFileSync(file, 'utf8');

const replacements = {
  'https://www.youtube.com/embed/qW1MLSX0qsU': 'https://www.youtube.com/embed/kBo5lMxNBsU',
  'https://www.youtube.com/embed/X-EIlBkiazA': 'https://www.youtube.com/embed/0nGBmqMeA40',
  'https://www.youtube.com/embed/tVWp1Fk7s0A': 'https://www.youtube.com/embed/wdln9qWYloU',
  'https://www.youtube.com/embed/LJcKxJKXMxg': 'https://www.youtube.com/embed/XKmNH6IVWjU',
  'https://www.youtube.com/embed/2S33F4kQrhs': 'https://www.youtube.com/embed/MCaCC1C4mHQ',
  'https://www.youtube.com/embed/FjMxaqKxjBg': 'https://www.youtube.com/embed/EC7RGJ975iM',
  'https://www.youtube.com/embed/s-16lMoHvMM': 'https://www.youtube.com/embed/Z6U6PNBUQPY',
  'https://www.youtube.com/embed/qKXLlzuVWFc': 'https://www.youtube.com/embed/2MJGg-dUKh0'
};

// 1. Replace all URLs
for (const [oldUrl, newUrl] of Object.entries(replacements)) {
  content = content.replace(oldUrl, newUrl);
}

// 2. Remove referenceImage lines entirely
content = content.replace(/.*referenceImage:.*?\n/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed file safely.');
