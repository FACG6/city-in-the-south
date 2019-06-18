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

const searchLogic = (searchFor, dataArray) => {
  return dataArray.filter(obj =>
    Object.values(obj).some(value =>
      String(value)
        .toLocaleLowerCase()
        .includes(searchFor.toLocaleLowerCase())
    )
  );
};

module.exports = { filterSkills, filterOfferTypes, searchLogic };
