const filterData = (arr, filterQuery) => {
  return arr.filter(
    item =>
      !filterQuery.filter(
        query => !item.skill.filter(_query => _query.id === query.id).length
      ).length
  );
};

module.exports = { filterData };
