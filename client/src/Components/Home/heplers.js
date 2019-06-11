const filterSkills = (arr, skillQuery) => {
  return arr.filter(
    item =>
      !skillQuery.filter(
        query => !item.skill.filter(_query => _query.id === query.id).length
      ).length
  );
};

const filterOfferTypes = (arr, offerTypeQuery) => {
  return arr.filter(
    item =>
      !offerTypeQuery.filter(
        query =>
          !item.offer_type.filter(_query => _query.id === query.id).length
      ).length
  );
};

const filteredOffers = (value1, value2) => {
  value1.filter(item => {
    return value2.filter(_item => item.id === _item.id);
  });
};

module.exports = { filterSkills, filterOfferTypes, filteredOffers };
