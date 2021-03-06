const fs = require('fs');
const _ = require('lodash');
const args = require('yargs')
  .string('start')
  .argv;

const slides = fs.readdirSync('./src/slides').filter(slide => slide.indexOf('placeholder.html') < 0);
const filteredSlides = _.takeRight(slides, slides.length - slides.indexOf(args.start));
const orderedSlides = _.orderBy(filteredSlides, ['asc']);

console.log(args.start);

_.forEachRight(orderedSlides, slide => {
  const nameParts = slide.split('-');
  const num = nameParts[0].startsWith('0') ? nameParts[0].substring(1) : nameParts[0];
  const newNum = parseInt(num) + 1;
  const newNumPart = newNum < 10 ? '0' + newNum : '' + newNum;
  const oldPath = `./src/slides/${slide}`;
  const newPath = `./src/slides/${newNumPart}-${nameParts[1]}`;
  fs.renameSync(oldPath, newPath);
});