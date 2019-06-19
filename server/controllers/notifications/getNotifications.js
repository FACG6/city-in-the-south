const { getNotifications } = require('../../database/queries/notifications');

module.exports = (req, res, next) => {
  const { member_id: memberId } = req.params;
  getNotifications(memberId)
    .then((result) => {
      if (result) {
        res.send({
          data: result.rows,
          error: null,
        });
        return;
      }
      next({ code: 500, msg: 'Internal Server Error' });
    })
    .catch((err) => {
      next(err);
    });
};
