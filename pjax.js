module.exports = function() {
  return function(req, res, next) {
    if (req.header('X-PJAX')) {
      req.pjax = true;
    }

    res.renderPjax = function(view, options, fn) {
      if (req.pjax) {
        if (options) {
          options.layout = false;
        } else {
          options = {};
          options.layout = false;
        }
      }
      
      options['isiPhone'] = req.useragent.isiPhone ||req.useragent.isiPad || req.useragent.isiPod;
      res.partialRender(view, options, fn);
    };

    next();
  };
};
