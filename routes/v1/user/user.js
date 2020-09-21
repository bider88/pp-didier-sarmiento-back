
const router = require('express').Router();

router.get('/:id', (req, res) => {

  const { id } = req.params;

  res.json({
    ok: true,
    data: req.result,
    id
  })

})

module.exports = router;