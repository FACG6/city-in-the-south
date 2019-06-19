const test = require('tape');
const { filterSkillsOfferType } = require('../../client/src/Components/Home/heplers');

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
const offersbyoffers = [
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
const offersbyskills = [
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
];
const offersbyBoth = [
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
];

test('testing filter function ', (t) => {
  const filteredbyskills = filterSkillsOfferType(offers, skills, []);
  t.deepEquals(filteredbyskills, offersbyskills, 'offers filtered by skills');
  const filteredbyoffers = filterSkillsOfferType(offers, [], offerType);
  t.deepEquals(filteredbyoffers, offersbyoffers, 'offers filtered by offer_types');
  const filteredbyBoth = filterSkillsOfferType(offers, skills, offerType);
  t.deepEquals(filteredbyBoth, offersbyBoth, 'offers filtered by offer_types and skills');
  const filterEmpty = filterSkillsOfferType([], skills, offerType);
  t.deepEquals(filterEmpty, [], 'empty offers filtered by offer_types and skills');

  t.end();
});
