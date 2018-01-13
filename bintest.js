var binance = require('node-binance-api')
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/binancedb')
var Binschema = require('./binschema.js')
var Marketschema = Binschema.Binmarkets
var Buyschema = Binschema.Buyschema
binance.options({
    'APIKEY': 
    'APISECRET': 
    test: true
})

binance.prices(function(ticker) {
    var markets = Object.keys(ticker)
    var marketsize = markets.length
    var lastmarket = markets[marketsize - 1]
    var btcmarket = lastmarket.substr(0, lastmarket.length - 3);
    var cointobuy = btcmarket + "BTC"
    Marketschema.findById({ _id: cointobuy }, function(err, marketdoc) {
        if (!marketdoc) {
            console.log('market ' + cointobuy + ' does not exist,buy it now')
            var btcmarketprice = ticker[cointobuy]
            var buycoinprice = ticker[cointobuy]
            var curbtcprice = ticker.BTCUSDT
            var howmanybtc = 2000 / curbtcprice
            console.log(howmanybtc)
            var quantitytobuy = Math.floor(howmanybtc / buycoinprice)
            console.log(quantitytobuy)
            console.log("BTCUSD price " + ticker.BTCUSDT)
            binance.marketBuy(cointobuy, quantitytobuy);
            var buytable = new Buyschema({
                _id: cointobuy,
                coin: btcmarket,
                usdmoney:2000,
                btcusd: curbtcprice,
                btcqty: howmanybtc,
                orderqty: quantitytobuy,
                reqprice: buycoinprice,
                status: "pending",
                ordertime: new Date()
            })
            var newmarket = new Marketschema({
                _id: cointobuy,
                coin: cointobuy,
                time: new Date()
            })
            newmarket.save(function(err, data) {
                if (err) return (err)
                buytable.save(function(err, buydata) {
                    console.log("buytable updated with order details")
                })
                console.log("updated the binancedb")
            })
        } else {
            console.log("market already exists " + cointobuy)
        }
    })
});