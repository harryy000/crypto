var mongoose = require('mongoose')
var Schema = mongoose.Schema

var binschema = new Schema({
    _id: String,
    coin: String,
    datte: Number,
    time: Date
})

var BuySchema = new Schema({
    _id: String,
    coin: String,
    usdmoney:Number,
    btcusd: Number,
    btcqty: Number,
    orderqty: Number,
    status: String,
    fulfilqty: Number,
    reqprice: Number,
    buyprice: Number,
    currentprice: Number,
    proflossperc: Number,
    datte: Number,
    ordertime: Date,
    fulfultime: Date
})

var binmarkets = mongoose.model('binmarket', binschema)
var Buyschema = mongoose.model('buytable', BuySchema)

module.exports = {
    Binmarkets: binmarkets,
    Buyschema: Buyschema
}