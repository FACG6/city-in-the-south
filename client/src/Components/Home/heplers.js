const filterData = (arr, skillsQuery, offerTypeQuery) => {
  return arr.filter(
    item =>
      !skillsQuery.filter(
        query =>
          !item.skill.filter(_query => {
            if (offerTypeQuery[0]) {
              return (
                _query.id === query.id &&
                !offerTypeQuery.filter(
                  offerquery =>
                    !item.offer_type.filter(
                      _offertype => _offertype.id === offerquery.id
                    ).length
                ).length
              );
            }
            return _query.id === query.id;
          }).length
      ).length
  );
};

module.exports = { filterData };
