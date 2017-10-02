var CoinIntraVol = require('./models1.js').Coinvolume
var ccy_id='Bitcoin-20170917'
var mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/cryptoanal')
CoinIntraVol.findById(ccy_id, function(err, doc) {

CoinIntraVol.update({ _id: ccy_id }, {
 $set: { 
     totalincvolyest: 40,
     totalincpriyest: 10,
     basevolyest: 300000000,
     basepriyest: 3502,
     basevollastweek: 300000000,
     baseprilastweek: 4200,
     totalincvoltoday: 10,
     totalincpritoday: 2.5,
     latestvoltoday: 3000000222,
     latetpricetoday:3700
 	 },
 	 $push: {
                                    Intraday: {
                                        totvolinctoday:20,
                                        totpriinctoday:2
                                    }
                                }
},
 	 function(err, data) {                       
     console.log(err)
     console.log(data)
  })

})