const handleError = (res, code, error) => {
  return res.status(code).json({
      ok:false,
      error
  })
}

module.exports = {
  handleError
}