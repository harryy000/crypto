var bittrex = require('node.bittrex.api');
var async = require('async')
Write_bitrex_base_table = require('./bitrexalert.js')
var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cryptoanal')
bittrex.options({
    
});

function Runiterations() {
    bittrex.getmarketsummaries(function(coindata, err) {
        if (err) {
            return console.error(err)
        }
        var coindata = coindata.result
        var usdbtcprice = ''
        var price_usd = ''
        var price_btc = ''
        var name = ''
        var curr_btcvolume = '';
        var open_buy_orders = '';
        var open_sell_orders = '';
        var curr_usdvolume = ''
        //Calling the BTC-USD pair first so that we get the latest btc-usd price ,we use this to compute usdvolumes and usd prices
        bittrex.getmarketsummary({ market: 'USDT-BTC' }, function(btcdata, err) {
            if (err) return console.log(err)
            var result = btcdata.result[0]
            var usdbtcprice = result.Last
            async.forEachSeries(coindata, function(eachcoin, callback) {
                var market = eachcoin.MarketName
                market = market.substring(0, 3)
                if (market == 'BTC' && eachcoin.Last > 0) {
                    eachcoin.usdbtcprice = usdbtcprice
                    price_btc = eachcoin.Last
                    price_usd = price_btc * usdbtcprice
                    curr_btcvolume = eachcoin.BaseVolume
                    curr_usdvolume = curr_btcvolume * usdbtcprice
                        eachcoin.price_usd = price_usd
                        eachcoin.price_btc = price_btc
                        eachcoin.curr_btcvolume = curr_btcvolume
                        eachcoin.curr_usdvolume = curr_usdvolume
                        Write_bitrex_base_table(eachcoin, function() {})
                }
                callback()
            }, function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("iteration is done ")
            })
        })

    });
}
//Runiterations()
module.exports=Runiterations
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