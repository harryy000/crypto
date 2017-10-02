var mongoose = require('mongoose')
var Schema = mongoose.Schema

var cryptoanalSchema = new Schema({
    ccyname: String,
    _id: String,
    exchange: String,
    baseusdprice: Number,
    Basebtcprice: Number,
    basevolume: Number,
    basevollastweek: Number,
    baseprilastweek: Number,
    basevolyest: Number,
    basepriyest: Number,
    totalincvolyest: Number,
    totalincpriyest: Number,
    totvolinctoday: Number,
    totpriinctoday: Number,
    latestvoltoday: Number,
    latetpricetoday: Number,
    latestvolincperc: Number,
    latestusdpriceincperc: Number,
    latestpricelagperc: Number,
    totpricelagperctoday: Number,
    datte: Number,
    basetime: { type: Date, default: Date.now },
    Intraday: [{
        usdprice: Number,
        btcprice: Number,
        volume: Number,
        volinc: Number,
        volincperc: Number,
        btcpriceinc: Number,
        usdpriceinc: Number,
        usdpriceincperc: Number,
        totvolinctoday: Number,
        totpriinctoday: Number,
        time: { type: Date, default: Date.now }
    }]

})
var alertSchema = new Schema({
    ccyname: String,
    _id: String,
    totvolinctoday: Number,
    totpriinctoday: Number,
    usdpriceincperc: Number,
    volincperc: Number,
    latestpricelagperc: Number,
    reason: String

})

/*MarketName: 'USDT-XMR',
  High: 90.51499939,
  Low: 83.35018637,
  Volume: 3055.63257501,
  Last: 86.5,
  BaseVolume: 263700.94130726,
  TimeStamp: '2017-09-22T21:40:27.27',
  Bid: 86,
  Ask: 86.5,
  OpenBuyOrders: 295,
  OpenSellOrders: 770,
  PrevDay: 88,
  Created: '2017-07-21T01:08:49.397' }
*/
var bitrexSchema = new Schema({
    ccyname: String,
    _id: String,
    baseusdprice: Number,
    Basebtcprice: Number,
    basebtcvolume: Number,
    baseusdvolume: Number,
    basebtcvollastweek: Number,
    baseusdvollastweek: Number,
    basebtcprilastweek: Number,
    baseusdprilastweek: Number,
    basebtcvolyest: Number,
    baseusdvolyest: Number,
    basepriyest: Number,
    totalbtcincvolyest: Number,
    totalbtcincpriyest: Number,
    totbtcvolinctoday: Number,
    totbtcpriinctoday: Number,
    latestbtcvoltoday: Number,
    latestusdvoltoday: Number,
    latetbtcpricetoday: Number,
    latetusdpricetoday: Number,
    latestbtcvolincperc: Number,
    latestbtcpriceincperc: Number,
    latestpricelagperc: Number,
    totpricelagperctoday: Number,
    currOpenBuyOrders: Number,
    currOpenSellOrders: Number,
    totincOpenBuyOrders: Number,
    totincOpenSellOrders: Number,
    datte: Number,
    basetime: { type: Date, default: Date.now },
    Intraday: [{
        usdprice: Number,
        btcprice: Number,
        btcvolume: Number,
        btcvolincperc: Number,
        btcpriceincperc: Number,
        totbtcvolinctoday: Number,
        totbtcpriinctoday: Number,
        currOpenBuyOrders: Number,
        currOpenSellOrders: Number,
        totincOpenBuyOrders: Number,
        totincOpenSellOrders: Number,
        time: { type: Date, default: Date.now }
    }]

})
var Coinvolume = mongoose.model('coinvolume', cryptoanalSchema)
var Bitrextable = mongoose.model('bitrexvolume', bitrexSchema)
module.exports = {
    Coinvolume: Coinvolume,
    Bitrextable: Bitrextable
}