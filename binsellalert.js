var binance = require('node-binance-api')
var mongoose = require("mongoose")
mongoose.connect('mongodb://localhost/binancedb')
var async = require("async")
var Binschema = require('./binschema.js')
var Marketschema = Binschema.Binmarkets
var Buyschema = Binschema.Buyschema
binance.options({
    'APIKEY': 
    'APISECRET': 
    test: true
})
Buyschema.find({ status: "bought" }, function(err, buytables) {
    async.forEach(buytables, function(buytable, callback) {

        var twentyperc = (buytable.reqprice * 0.2)
        var stoplosspri = buytable.reqprice - twentyperc
        binance.prices(function(ticker) {
            var curprice = ticker[buytable._id]
            console.log(curprice)
            var buyprice = buytable.reqprice
            console.log(buyprice)
            var change_perc = percincdec(buyprice, curprice)
            console.log(change_perc)
            if (change_perc < -2) {
                var quantity = buytable.orderqty;
                binance.marketSell(buytable._id, quantity);
                var writearr = {
                    status: "pending_sell"
                }
                Buyschema.update({ _id: buytable._id }, {
                    $set: writearr
                }, function(err, data) {
                    if (err) console.log(err)
                    console.log("sold now")
                    callback()
                })
            }
        });
    }, function(err) {
        if (err) return next(err);
        //Tell the user about the great success
        console.log("iteration is over")
    });

    function percincdec(prev_val, cur_val) {
        if (prev_val > cur_val) {
            var inc_dec_perc = -((prev_val - cur_val) / prev_val) * 100
        } else {
            var inc_dec_perc = ((cur_val - prev_val) / prev_val) * 100
        }
        return inc_dec_perc
    }
})