var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET home page. */
router.get('/getDiskList', function(req, res, next) {
     var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
     axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
          res.json(response.data)
        }).catch((e) => {
            console.log(e)
          })
})

router.get('/lyric', function(req, res, next) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response)=>{
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var maches = ret.match(reg)
      if(maches) {
        ret = JSON.parse(maches[1])
      }
    }
    res.json(ret)
  }).catch((e)=>{
    console.log(e)
  })
})


router.get('/getSongList', function(req, res, next) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://y.qq.com/n/yqq/playsquare/4101538044.html',
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
module.exports = router;
