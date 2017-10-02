var Cryptotables = require('./cryptoschema.js')
var Bitrextable = Cryptotables.Bitrextable
var sendlert = require('./mail.js')
var mongoose = require('mongoose')
//var TODAY=require('./date.test.js')
//var uri = "mongodb://localhost/cryptoanal"
//const connection = mongoose.connect("mongodb://localhost/cryptoanal")

var testalrt = {}
module.exports = function write_bitrex_base_table(coin, callback) {
    var date = new Date().toLocaleDateString().split("/"); // "M/D/YYYY"
    //console.log(date)
    date[0] = date[0].length == 1 ? "0" + date[0] : date[0];
    date[1] = date[1].length == 1 ? "0" + date[1] : date[1];
    date = date[2] + date[0] + date[1];


    var dateyest = new Date();
    dateyest.setDate(dateyest.getDate() - 1);
    dateyest = dateyest.toLocaleDateString().split("/");
    dateyest[0] = dateyest[0].length == 1 ? "0" + dateyest[0] : dateyest[0];
    dateyest[1] = dateyest[1].length == 1 ? "0" + dateyest[1] : dateyest[1];
    dateyest = dateyest[2] + dateyest[0] + dateyest[1];
    //console.log(dateyest)

    var datelastweek = new Date();
    datelastweek.setDate(datelastweek.getDate() - 5);
    datelastweek = datelastweek.toLocaleDateString().split("/");
    datelastweek[0] = datelastweek[0].length == 1 ? "0" + datelastweek[0] : datelastweek[0];
    datelastweek[1] = datelastweek[1].length == 1 ? "0" + datelastweek[1] : datelastweek[1];
    datelastweek = datelastweek[2] + datelastweek[0] + datelastweek[1];
    //console.log(datelastweek)

    var TODAY = date
    var Yesterday = dateyest
    var lastweek = datelastweek
    var ccy_id = coin.MarketName + '-' + TODAY
    var ccy_id_yest = coin.MarketName + '-' + Yesterday
    var ccy_id_lastweek = coin.MarketName + '-' + lastweek
    var higesht_btc_pri_inc_perc = ''
    var highest_btc_pri_inc_perc = 0
    var jumparray = 0
    Bitrextable.findById(ccy_id, function(err, doc) {
        if (err) return console.log('the error here is ' + err)
        if (!doc) {
            Bitrextable.findById(ccy_id_yest, function(err, doc_yest) {
                if (doc_yest) {
                    highest_btc_pri_inc_perc = doc.higeshtjumpbtcpriperc
                    var intra_size = doc_yest.Intraday.length
                    var prev_rec = doc_yest.Intraday[intra_size - 1]
                    calculateincreases(coin, prev_rec, function(err, calcvalues) {
                        var cryptoanalwrite = new Bitrextable({
                            _id: ccy_id,
                            usdprice: coin.price_usd,
                            btcprice: coin.price_btc,
                            btcvolume: coin.curr_btcvolume,
                            usdvolume: coin.curr_usdvolume,
                            OpenBuyOrders: coin.OpenBuyOrders,
                            OpenSellOrders: coin.OpenSellOrders,
                            datte: TODAY,
                        })
                        cryptoanalwrite.save(function(err, results) {
                            if (err) return console.log(err)
                            callback()
                        })
                    })

                }
            })
        } else {
            var intra_size = doc.Intraday.length
            if (intra_size < 1) {
                var prev_btc_vol = doc.btcvolume
                var prev_btc_price = doc.btcprice
                var prev_usd_vol = doc.usdvolume
                var prev_usd_pri = doc.usdprice
                var prev_openbuyorders = doc.OpenBuyOrders
                var prev_opensellorders = doc.OpenSellOrders
            } else {
                var prev_rec = doc.Intraday[intra_size - 1]
                var prev_btc_vol = prev_rec.btcvolume
                var prev_btc_price = prev_rec.btcprice
                var prev_openbuyorders = prev_rec.OpenBuyOrders
                var prev_opensellorders = prev_rec.OpenSellOrders
            }
            //This section computes the difference in btc volume,btc price ,buy && sell orders between 2 ticks,meaning if the bot runs every 10 minutes,
            //This will be the difference between the now and 10 minutes ago

            /*      var doc_high_jump_perc = doc.higeshtjumpbtcpriperc
                 var jumparray=doc.jumparray
                  if (!doc_high_jump_perc) {
                      doc_high_jump_perc = 0
                  }
                  if(!jumparray){
                      jumparray=0
                  }
                  if (btc_pri_inc_perc > doc_high_jump_perc) {
                      highest_btc_pri_inc_perc = btc_pri_inc_perc
                      var jumparray = doc.Intraday.length
                  } else {
                      highest_btc_pri_inc_perc = doc.doc_high_jump_perc
                      var jumparray = doc.jumparray
                  }
                  */
            Bitrextable.update({ _id: ccy_id }, {
                    $set: {
                        latestusdprice: coin.price_usd,
                        latestbtcprice: coin.price_btc,
                        latestbtcvolume: coin.curr_btcvolume,
                        latestusdvolume: coin.curr_usdvolume,
                        latestOpenBuyOrders: coin.OpenBuyOrders,
                        latestOpenSellOrders: coin.OpenSellOrders,
                        latestbtcpriceincperc: btc_pri_inc_perc,
                        latestbtcvolincperc: btc_vol_inc_perc,
                        latestOpenBuyOrdersincperc: open_buy_order_inc_perc,
                        latestOpenSellOrdersincperc: open_sell_order_inc_perc,
                        highestjumpbtcpriperc: highest_btc_pri_inc_perc,
                        btcjumparray: jumparray
                    },
                    $push: {
                        Intraday: {
                            usdprice: coin.price_usd,
                            btcprice: coin.price_btc,
                            btcvolume: coin.curr_btcvolume,
                            usdvolume: coin.curr_usdvolume,
                            OpenBuyOrders: coin.OpenBuyOrders,
                            OpenSellOrders: coin.OpenSellOrders,
                            btcpriceincperc: btc_pri_inc_perc,
                            btcvolincperc: btc_vol_inc_perc,
                            OpenBuyOrdersincperc: open_buy_order_inc_perc,
                            OpenSellOrdersincperc: open_sell_order_inc_perc
                        }
                    }
                },
                function(err, data) {
                    callback()
                })
        }
    })
}

function calculateincreases(coin, prev_rec, callback) {

    var calcvalues = ''
    var prev_btc_vol = prev_rec.btcvolume
    var prev_btc_price = prev_rec.btcprice
    var prev_openbuyorders = prev_rec.OpenBuyOrders
    var prev_opensellorders = prev_rec.OpenSellOrders

    if (prev_btc_vol > coin.curr_btcvolume) {
        var btc_vol_inc_perc = -((prev_btc_vol - coin.curr_btcvolume) / prev_btc_vol) * 100
    } else {
        var btc_vol_inc_perc = ((coin.curr_btcvolume - prev_btc_vol) / prev_btc_vol) * 100
    }
    if (prev_btc_price > coin.price_btc) {
        var btc_pri_inc_perc = -((prev_btc_price - coin.price_btc) / prev_btc_price) * 100
    } else {
        var btc_pri_inc_perc = ((coin.price_btc - prev_btc_price) / prev_btc_price) * 100
    }
    if (prev_openbuyorders > coin.OpenBuyOrders) {
        var open_buy_order_inc_perc = -((prev_openbuyorders - coin.OpenBuyOrders) / prev_openbuyorders) * 100
    } else {
        var open_buy_order_inc_perc = ((coin.OpenBuyOrders - prev_openbuyorders) / prev_openbuyorders) * 100
    }
    if (prev_opensellorders > coin.OpenSellOrders) {
        var open_sell_order_inc_perc = -((prev_opensellorders - coin.OpenSellOrders) / prev_opensellorders) * 100
    } else {
        var open_sell_order_inc_perc = ((coin.OpenSellOrders - prev_opensellorders) / prev_opensellorders) * 100
    }
    calcvalues = {
        btc_vol_inc_perc: btc_vol_inc_perc,
        btc_pri_inc_perc: btc_pri_inc_perc,
        open_buy_order_inc_perc: open_buy_order_inc_perc,
        open_sell_order_inc_perc;open_sell_order_inc_perc


    }
    callback('', calcvalues)
}