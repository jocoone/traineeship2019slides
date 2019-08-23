const fs = require('fs');

const slides = fs.readdirSync('./src/slides').filter(slide => slide.indexOf('placeholder.html') < 0);

slides.forEach(slide => {
  const nameParts = slide.split('-');
  const num = nameParts[0] === ''
  fs.renameSync(slide, )
});