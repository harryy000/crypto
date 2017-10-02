var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bitrexSchema = new Schema({
    _id: String,
    usdprice: Number,
    btcprice: Number,
    usdvolume: Number,
    btcvolume: Number,
    btcpriceincperc: Number,
    btcvolincperc: Number,
    OpenBuyOrders: Number,
    OpenSellOrders: Number,
    OpenBuyOrdersincperc: Number,
    OpenSellOrdersincperc: Number,
    datte: Number,
    latestusdprice: Number,
    latestbtcprice: Number,
    latestbtcvolume: Number,
    latestusdvolume: Number,
    latestOpenBuyOrders: Number,
    latestOpenSellOrders: Number,
    latestbtcpriceincperc: Number,
    latestbtcvolincperc: Number,
    latestOpenBuyOrdersincperc: Number,
    latestOpenSellOrdersincperc: Number,
    time: { type: Date, default: Date.now },
    highestjumpbtcpriperc: Number,
    highestjumpbtcvolperc: Number,
    btcprijumparray: String,
    btcvoljumparray: String,
    highestbtcprice: Number,
    highestbtcpricejumparray: String,
    totbtcvolinctoday:Number,
    totbtcpriceinctoday:Number,
    totopenbuyorderinctoday:Number,
    totopensellorderinctoday:Number,
    Intraday: [{
        usdprice: Number,
        btcprice: Number,
        btcvolume: Number,
        usdvolume: Number,
        btcvolincperc: Number,
        btcpriceincperc: Number,
        OpenBuyOrders: Number,
        OpenSellOrders: Number,
        OpenBuyOrdersincperc: Number,
        OpenSellOrdersincperc: Number,
        time: { type: Date, default: Date.now }
    }]
})
var Bitrextable = mongoose.model('bitrexvolume', bitrexSchema)
module.exports = {
    Bitrextable: Bitrextable
}