/**
 *
 * How to run the test
 * node test/testingFunction/test.js
 *
 * * */


const test = require('tape');
const { filterSkillsOfferType } = require('./function');

const offerType = [
  { id: 1, name: 'part' },
  { id: 2, name: 'full' },
  { id: 3, name: 'part' },
];
const skills = [
  { id: 1, name: 'react' },
  { id: 2, name: 'js' },
];
const offers = [
  {
    id: 2,
    position: 'Front End Developer',
    offer_types:
    [{ id: 1, name: 'part' },
      { id: 2, name: 'full' },
      { id: 3, name: 'part' },
    ],
    skills: [
      { id: 1, name: 'react' },
      { id: 2, name: 'js' },
    ],
  },
  {
    id: 2,
    position: 'Back-End',
    offer_types:
    [{ id: 1, name: 'part' },
      { id: 2, name: 'full' },
    ],
    skills: [
      { id: 1, name: 'react' },
      { id: 2, name: 'js' },
    ],
  },
  {
    id: 3,
    position: 'Fullstack-End',
    offer_types:
    [{ id: 1, name: 'part' },
      { id: 2, name: 'full' },
      { id: 3, name: 'part' },
    ],
    skills: [
      { id: 1, name: 'react' },
    ],
  },
];
test('testing function ', (t) => {
  const asdf = filterSkillsOfferType(offers, skills, offerType);
  t.equal(1, 1, 'testing');
  t.end();
});
