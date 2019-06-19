function isSubArr(filteredArr, filteredByArr) {
  // check if all ids in filteredByArr exist in filteredArr
  return filteredByArr.every(item =>
    filteredArr.some(_item => item.id === _item.id)
  );
}

function filterSkillsOfferType(arr, skills, offertypes) {
  let filteredArr = arr;
  if (skills[0] && offertypes[0]) {
    filteredArr = arr
      .filter(item => isSubArr(item.skills, skills))
      .filter(item => isSubArr(item.offer_types, offertypes));
  }
  if (!skills[0] && offertypes[0]) {
    filteredArr = arr.filter(item => isSubArr(item.offer_types, offertypes));
  }
  if (skills[0] && !offertypes[0]) {
    filteredArr = arr.filter(item => isSubArr(item.skills, skills));
  }
  return filteredArr;
}

function getfilteredMembers(skills, offset, cb) {
  fetch(`/api/v1/members/${offset}`, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      if (res.data[0]) {
        const filterMembers = filterSkillsOfferType(res.data, skills, []);
        cb(null, { members: res.data, filterMembers });
      } else {
        throw new Error();
      }
    })
    .catch(() => ({ errMSg: 'Something went wrong' }));
}

function getfilteredOffers(skills, offerTypes, offset, cb) {
  fetch(`/api/v1/offers/${offset}`, { method: 'GET' })
    .then(res => res.json())
    .then(res => {
      if (res.data[0]) {
        const filteredOffers = filterSkillsOfferType(
          res.data,
          skills,
          offerTypes
        );
        cb(null, { offers: res.data, filteredOffers });
      } else {
        throw new Error();
      }
    })
    .catch(() => ({ errMSg: 'Something went wrong' }));
}

const searchLogic = (searchFor, dataArray) => {
  return dataArray.filter(obj =>
    Object.values(obj).some(value =>
      String(value)
        .toLocaleLowerCase()
        .includes(searchFor.toLocaleLowerCase())
    )
  );
};

module.exports = {
  getfilteredMembers,
  getfilteredOffers,
  filterSkillsOfferType,
  searchLogic,
};
