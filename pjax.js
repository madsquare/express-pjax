module.exports = function () {
  return function (req, res, next) {
    if (req.header('X-PJAX')) {
      req.pjax = true
    }

    res.renderPjax = function (view, options, fn) {
      if (req.pjax) {
        if (options) {
          options.layout = false
        } else {
          options = {}
          options.layout = false
        }
      }

      options['isiPhone'] = req.useragent.isiPhone || req.useragent.isiPad || req.useragent.isiPod
      options['isSnackkApp'] = req.useragent.source.indexOf('snackk_app') !== -1
      res.partialRender(view, options, fn)
    }

    next()
  }
}
