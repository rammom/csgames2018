var express = require('express');
var router = express.Router();
var Program = require('../programming');
var moment = require('moment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('providers', {assets: Program.assets, providers: Program.providers});
});
router.get('/providerPage/:ID', function (req, res, next) {
  var newAssets = [];
  Program.assets.forEach(function(asset){
    if (asset.providerId == req.params.ID){      
      let currentDate = new Date().toJSON();
      if (moment(currentDate).isAfter(asset.licensingWindow.start) && moment(currentDate).isBefore(asset.licensingWindow.end)){
        asset.able = true;
      }
      else{
        asset.able = false;
      }
      /* */
      newAssets.push(asset);      
    }
  });
  var prov;
  Program.providers.forEach(function(provider){
    if (provider.id == req.params.ID){
      prov = provider;
    }
  });
  res.render('providerPage', { assets: newAssets, provider: prov });
});
router.get('/watch/:ID', function(req, res, render){
  Program.assets.forEach(function(asset){
    if (asset.mediaId == req.params.ID){
      var str = "https://www.youtube.com/embed/" + req.params.ID;
      console.log(str);
      res.render('videoPage', {link: str});
    }
  });
});

module.exports = router;
