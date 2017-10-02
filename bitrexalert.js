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
    var highest_btc_pri_inc_perc = 0
    var jumparray = 0
    Bitrextable.findById(ccy_id, function(err, doc) {
        if (err) return console.log('the error here is ' + err)
        if (!doc) {
            Bitrextable.findById(ccy_id_yest, function(err, doc_yest) {
                if (doc_yest) {
                   // highest_btc_pri_inc_perc = doc.higeshtjumpbtcpriperc
                }
                calculateincreases(coin, doc_yest, function(err, calcvalues) {
                    var cryptoanalwrite = new Bitrextable({
                        _id: ccy_id,
                        usdprice: coin.price_usd,
                        btcprice: coin.price_btc,
                        btcvolume: coin.curr_btcvolume,
                        usdvolume: coin.curr_usdvolume,
                        OpenBuyOrders: coin.OpenBuyOrders,
                        OpenSellOrders: coin.OpenSellOrders,
                        datte: TODAY,
                        btcpriceincperc: calcvalues.btc_pri_inc_perc,
                        btcvolincperc: calcvalues.btc_vol_inc_perc,
                        OpenBuyOrdersincperc: calcvalues.open_buy_order_inc_perc,
                        OpenSellOrdersincperc: calcvalues.open_sell_order_inc_perc,
                        latestusdprice: coin.price_usd,
                        latestbtcprice: coin.price_btc,
                        latestbtcvolume: coin.curr_btcvolume,
                        latestusdvolume: coin.curr_usdvolume,
                        latestOpenBuyOrders: coin.OpenBuyOrders,
                        latestOpenSellOrders: coin.OpenSellOrders,
                        latestbtcpriceincperc: calcvalues.btc_pri_inc_perc,
                        latestbtcvolincperc: calcvalues.btc_vol_inc_perc,
                        latestOpenBuyOrdersincperc: calcvalues.open_buy_order_inc_perc,
                        latestOpenSellOrdersincperc: calcvalues.open_sell_order_inc_perc
                    })
                    cryptoanalwrite.save(function(err, results) {
                        if (err) return console.log(err)
                        callback()
                    })
                })
            })
        } else {
            calculateincreases(coin, doc, function(err, calcvalues) {
                Bitrextable.update({ _id: ccy_id }, {
                        $set: {
                            latestusdprice: coin.price_usd,
                            latestbtcprice: coin.price_btc,
                            latestbtcvolume: coin.curr_btcvolume,
                            latestusdvolume: coin.curr_usdvolume,
                            latestOpenBuyOrders: coin.OpenBuyOrders,
                            latestOpenSellOrders: coin.OpenSellOrders,
                            latestbtcpriceincperc: calcvalues.btc_pri_inc_perc,
                            latestbtcvolincperc: calcvalues.btc_vol_inc_perc,
                            latestOpenBuyOrdersincperc: calcvalues.open_buy_order_inc_perc,
                            latestOpenSellOrdersincperc: calcvalues.open_sell_order_inc_perc,
                            totbtcvolinctoday: calcvalues.daybegin_btc_vol_inc_perc,
                            totbtcpriceinctoday: calcvalues.daybegin_btc_pri_inc_perc,
                            totopenbuyorderinctoday: calcvalues.begin_open_buy_order_inc_perc,
                            totopensellorderinctoday: calcvalues.begin_open_sell_order_inc_perc
                        },
                        $push: {
                            Intraday: {
                                usdprice: coin.price_usd,
                                btcprice: coin.price_btc,
                                btcvolume: coin.curr_btcvolume,
                                usdvolume: coin.curr_usdvolume,
                                OpenBuyOrders: coin.OpenBuyOrders,
                                OpenSellOrders: coin.OpenSellOrders,
                                btcpriceincperc: calcvalues.btc_pri_inc_perc,
                                btcvolincperc: calcvalues.btc_vol_inc_perc,
                                OpenBuyOrdersincperc: calcvalues.open_buy_order_inc_perc,
                                OpenSellOrdersincperc: calcvalues.open_sell_order_inc_perc
                            }
                        }
                    },
                    function(err, data) {
                        if (err) {
                            console.log(err)
                            console.log(calcvalues)
                            console.log(ccy_id)
                            return
                        }
                        
                        callback()
                    })
            })
        }
    })
}

function calculateincreases(coin, prev_or_current_doc, callback) {
    if (!prev_or_current_doc) return callback('', '')
    var intra_size = prev_or_current_doc.Intraday.length
    if (intra_size < 1) {
        var prev_val = prev_or_current_doc
    } else {
        var prev_val = prev_or_current_doc.Intraday[intra_size - 1]
    }
    var calcvalues = ''
    var prev_btc_vol = prev_val.btcvolume
    var prev_btc_price = prev_val.btcprice
    var prev_openbuyorders = prev_val.OpenBuyOrders
    var prev_opensellorders = prev_val.OpenSellOrders
    //Begining of the day price and volume    
    var daybegin_btc_vol = prev_or_current_doc.btcvolume
    var daybegin_btc_price = prev_or_current_doc.btcprice
    var daybegin_openbuyorders = prev_or_current_doc.OpenBuyOrders
    var daybegin_opensellorders = prev_or_current_doc.OpenSellOrders

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

    if (daybegin_btc_vol > coin.curr_btcvolume) {
        var daybegin_btc_vol_inc_perc = -((daybegin_btc_vol - coin.curr_btcvolume) / daybegin_btc_vol) * 100
    } else {
        var daybegin_btc_vol_inc_perc = ((coin.curr_btcvolume - daybegin_btc_vol) / daybegin_btc_vol) * 100
    }
    if (daybegin_btc_price > coin.price_btc) {
        var daybegin_btc_pri_inc_perc = -((daybegin_btc_price - coin.price_btc) / daybegin_btc_price) * 100
    } else {
        var daybegin_btc_pri_inc_perc = ((coin.price_btc - daybegin_btc_price) / daybegin_btc_price) * 100
    }
    if (daybegin_openbuyorders > coin.OpenBuyOrders) {
        var begin_open_buy_order_inc_perc = -((daybegin_openbuyorders - coin.OpenBuyOrders) / daybegin_openbuyorders) * 100
    } else {
        var begin_open_buy_order_inc_perc = ((coin.OpenBuyOrders - daybegin_openbuyorders) / daybegin_openbuyorders) * 100
    }
    if (daybegin_opensellorders > coin.OpenSellOrders) {
        var begin_open_sell_order_inc_perc = -((daybegin_opensellorders - coin.OpenSellOrders) / daybegin_opensellorders) * 100
    } else {
        var begin_open_sell_order_inc_perc = ((coin.OpenSellOrders - daybegin_opensellorders) / daybegin_opensellorders) * 100
    }

    calcvalues = {
        btc_vol_inc_perc: btc_vol_inc_perc,
        btc_pri_inc_perc: btc_pri_inc_perc,
        open_buy_order_inc_perc: open_buy_order_inc_perc,
        open_sell_order_inc_perc: open_sell_order_inc_perc,
        daybegin_btc_vol_inc_perc: daybegin_btc_vol_inc_perc,
        daybegin_btc_pri_inc_perc: daybegin_btc_pri_inc_perc,
        begin_open_buy_order_inc_perc: begin_open_buy_order_inc_perc,
        begin_open_sell_order_inc_perc: begin_open_sell_order_inc_perc
    }
    callback('', calcvalues)
}