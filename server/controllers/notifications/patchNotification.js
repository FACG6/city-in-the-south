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
      }
    })
    .catch((err) => {
      next(err);
    });
};
