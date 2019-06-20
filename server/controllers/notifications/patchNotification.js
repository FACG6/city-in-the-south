const { patchNotification } = require('../../database/queries/notifications');

module.exports = (req, res, next) => {
  const { id } = req.params;
  patchNotification(id)
    .then((result) => {
      if (result.rowCount) {
        res.send({
          data: result.rows[0],
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
