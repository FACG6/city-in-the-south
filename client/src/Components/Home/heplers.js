const filterSkills = (arr, skillQuery) => {
  return arr.filter(
    item =>
      !skillQuery.filter(
        query => !item.skills.filter(_query => _query.id === query.id).length
      ).length
  );
};

const filterOfferTypes = (arr, offerTypeQuery) => {
  return arr.filter(
    item =>
      !offerTypeQuery.filter(
        query =>
          !item.offer_types.filter(_query => _query.id === query.id).length
      ).length
  );
};

function isSubArr(filteredArr, filteredByArr) {
  // check if all ids in filteredByArr exist in filteredArr
  return filteredByArr.every(item =>
    filteredArr.some(_item => item.id === _item.id)
  );
}

function filterSkillsOfferType(arr, skills, offertypes) {
  let filteredArr;
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
  filterSkills,
  filterOfferTypes,
  filterSkillsOfferType,
  searchLogic,
};
