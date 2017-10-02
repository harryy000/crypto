var request = require("request")
var async = require("async")
Write_base_table = require('./db1.js')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cryptoanal')

function Doquery() {
    var alert = []
    request("https://api.coinmarketcap.com/v1/ticker/", function(err, res, coindata) {
        console.log('last ran at ' + Date())
        var newcoindata = JSON.parse(coindata)
        //  var alertobj={}
        var cnt = 0
        async.forEachSeries(newcoindata, function(coin, callback) {
            if (coin.rank < 300) {
                Write_base_table(coin, function() {})
            }
            callback()
        }, function(err) {
            if (err) return err
            console.log('iteration is done')


        })
    })
}
//Doquery()
module.exports = Doquery