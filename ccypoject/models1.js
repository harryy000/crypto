var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cryptoanalSchema=new Schema({
            ccyname:String,
              _id:String,
              exchange:  String,
              baseusdprice:Number,
              Basebtcprice:Number,
              basevolume:Number,
               basevollastweek:Number,
               baseprilastweek:Number,
               basevolyest:Number,
               basepriyest:Number,
               totalincvolyest:Number,
               totalincpriyest:Number,
               totvolinctoday:Number,
               totpriinctoday:Number,
               latestvoltoday:Number,
               latetpricetoday:Number,
               latestvolincperc:Number,
               latestusdpriceincperc:Number,
               latestpricelagperc:Number,
               totpricelagperctoday:Number,
               datte:Number,
               basetime:{ type: Date, default: Date.now },
             Intraday:[{
                usdprice: Number, 
                btcprice: Number ,
                volume: Number ,
                volinc:Number,
                volincperc:Number,
                btcpriceinc:Number,
                usdpriceinc:Number,
                usdpriceincperc:Number,
                totvolinctoday:Number,
                totpriinctoday:Number,
                time: { type: Date, default: Date.now }
              }]
              
        })
var alertSchema=new Schema({
               ccyname:String,
              _id:String,
               totvolinctoday:Number,
                totpriinctoday:Number,
                usdpriceincperc:Number,
                volincperc:Number,
              volincperc:Number,
              latestpricelagperc:Number
  
})
var Coinvolume = mongoose.model('coinvolume', cryptoanalSchema)
module.exports = {
    Coinvolume: Coinvolume
}
