var globalVars = require('./global-variables');

globalVars.functionCollection = {
    logError : function (err, req, res, next){
      if(!err) return next();
      console.log(err);
      next(err);
    },
    
    errorHandler : function (err, req, res, next){
      res.status(500);
      res.render('error', {error: err});
      next(err);
    },
    
    clientErrorHandler : function (err, req, res, next){
      if(req.xhr){
        res.status(500).send({error: 'something failed!'});
        res.render('error', {error: err});
      }else{
        next(err);
      }
    }
};