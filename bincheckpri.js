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
Buyschema.find({ status: "pending" }, function(err, buytables) {
    async.forEach(buytables, function(buytable, callback) {
        console.log(buytable)
        binance.balance(function(balances) {
            console.log("balances()", balances)
            //var fulfilqty = balances[buytable.coin].available; //balance from exchange 
            var fulfilqty = 538
            var orderqty = buytable.orderqty; //total order quantity
            console.log(orderqty)
            console.log(fulfilqty)
            if (fulfilqty == orderqty) {
                console.log("stop loss can be done")
                // var twentyperc = (buytable.reqprice * 0.2)
                //var fifteenperc = (buytable.reqprice * 0.15)
                //var stoplosspri = buytable.reqprice - twentyperc
                //var prestoplosspri = buytable_.reqprice - fifteenperc
                var writearr = {
                    status: "bought",
                    fulfultime: new Date()
                }
                Buyschema.update({ _id: buytable._id }, {
                    $set: writearr
                }, function(err, data) {
                    if (err) console.log(err)
                    	console.log("bought now")
                    callback()
                })
            } else {
                callback()
            }
        });
    }, function(err) {
        if (err) return next(err);
        //Tell the user about the great success
        console.log("iteration is over")
    });
})