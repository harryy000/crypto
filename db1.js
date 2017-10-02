var CoinIntraVol = require('./models1.js').Coinvolume
var sendlert=require('./mail.js')
var mongoose = require('mongoose')
//var TODAY=require('./date.test.js')
//var uri = "mongodb://localhost/cryptoanal"
//const connection = mongoose.connect("mongodb://localhost/cryptoanal")
var testalrt={}
module.exports=function write_base_table(coin,callback){

var date = new Date().toLocaleDateString().split("/");  // "M/D/YYYY"
//console.log(date)
date[0] = date[0].length == 1 ? "0" + date[0] : date[0];
date[1] = date[1].length == 1 ? "0" + date[1] : date[1];
date = date[2] + date[0] + date[1];
//console.log(date)

var dateyest= new Date();
dateyest.setDate(dateyest.getDate()-1);
dateyest=dateyest.toLocaleDateString().split("/");
dateyest[0] = dateyest[0].length == 1 ? "0" + dateyest[0] : dateyest[0];
dateyest[1] = dateyest[1].length == 1 ? "0" + dateyest[1] : dateyest[1];
dateyest = dateyest[2] + dateyest[0] + dateyest[1];
//console.log(dateyest)

var datelastweek= new Date();
datelastweek.setDate(datelastweek.getDate()-5);
datelastweek=datelastweek.toLocaleDateString().split("/");
datelastweek[0] = datelastweek[0].length == 1 ? "0" + datelastweek[0] : datelastweek[0];
datelastweek[1] = datelastweek[1].length == 1 ? "0" + datelastweek[1] : datelastweek[1];
datelastweek = datelastweek[2] + datelastweek[0] + datelastweek[1];
//console.log(datelastweek)


var TODAY=date
var Yesterday=dateyest
var lastweek=datelastweek
var ccy_id=coin.name+'-'+TODAY
var ccy_id_yest=coin.name+'-'+Yesterday
var ccy_id_lastweek=coin.name+'-'+lastweek

            CoinIntraVol.findById(ccy_id, function(err, doc) {
                if (!doc) {
                    var cryptoanalwrite = new CoinIntraVol({
                        ccyname: coin.name+'-'+coin.symbol,
                        _id: ccy_id,
                        baseusdprice: coin.price_usd,
                        Basebtcprice: coin.price_btc,
                        basevolume: coin["24h_volume_usd"]
                    })
                    cryptoanalwrite.save(function(err, results) {
                            
                            callback()
                        })

                        } else {
                            var intra_size=doc.Intraday.length
                            if (intra_size <1){
                             var prev_vol=doc.basevolume
                             var prev_price=doc.baseusdprice
                            } else{
                            var prev_rec=doc.Intraday[intra_size-1]
                            var prev_vol=prev_rec.volume
                            var prev_price=prev_rec.usdprice
                            }
                            if (prev_vol > coin["24h_volume_usd"]){
                                var vol_inc_perc=-((prev_vol - coin["24h_volume_usd"])/prev_vol)*100  
                            } else{
                               var vol_inc_perc=((coin["24h_volume_usd"]- prev_vol)/prev_vol)*100 
                            }
                            if (prev_price > coin.price_usd){
                                var pri_inc_perc=-((prev_price-coin.price_usd)/prev_price)*100
                            } else{
                                var pri_inc_perc=((coin.price_usd-prev_price)/prev_price)*100
                            }
                            if (intra_size<1){
                                var tot_vol_inc_today=vol_inc_perc
                                var tot_pri_inc_today=pri_inc_perc
                            }else{
                                if (doc.basevolume > coin["24h_volume_usd"]){
                                    var tot_vol_inc_today=-((doc.basevolume - coin["24h_volume_usd"])/doc.basevolume)*100
                                }else{
                                    var tot_vol_inc_today=((coin["24h_volume_usd"]-doc.basevolume)/doc.basevolume)*100
                                }

                                if(doc.baseusdprice>coin.price_usd){
                                    var tot_pri_inc_today=-((doc.baseusdprice-coin.price_usd)/doc.baseusdprice)*100
                                }else{
                                    var tot_pri_inc_today=((coin.price_usd-doc.baseusdprice)/doc.baseusdprice)*100
                                }
                                //var tot_vol_inc_today=coin["24h_volume_usd"] - doc.basevolume
                                //var tot_pri_inc_today=pri_inc_perc+prev_rec.totpriinctoday
                            }
                            var totpricelagperctoday=0
                            var latestpricelagperc=0
                            if (tot_vol_inc_today > 0){
                                if (tot_pri_inc_today > 0){
                                    var totpricelagperctoday=tot_vol_inc_today-tot_pri_inc_today
                                }
                            }
                            if (vol_inc_perc >0){
                                if (pri_inc_perc > 0){
                                 var latestpricelagperc=vol_inc_perc-pri_inc_perc
                                }
                            }
                            
                            var vol_inc=coin["24h_volume_usd"] - prev_vol
                            var price_inc=coin.price_usd - prev_price
                            var basevolyest=''
                            var basepriyest=''
                            var totalincvolyest=''
                            var totalincpriyest=''
                            CoinIntraVol.findById(ccy_id_yest, function(erryest, docyest) {
                                if (docyest){
                                    var basevolyest=docyest.basevolume
                                    var basepriyest=docyest.baseusdprice
                                    var totalincvolyest=docyest.totvolinctoday
                                    var totalincpriyest=docyest.totpriinctoday
                                }
                            })
                            var basevollastweek=''
                            var baseprilastweek=''
                            CoinIntraVol.findById(ccy_id_lastweek, function(errlastweek, doclastweek) {
                                if (doclastweek){
                                    basevollastweek=doclastweek.baseusdprice
                                    baseprilastweek=doclastweek.basevolume
                                }
                            })



                            CoinIntraVol.update({ _id: ccy_id }, {
                                $set: { 
                                totalincvolyest: totalincvolyest,
                                totalincpriyest: totalincpriyest,
                                basevolyest: basevolyest,
                                basepriyest: basepriyest,
                                basevollastweek: basevollastweek,
                                baseprilastweek: baseprilastweek,
                                totvolinctoday: tot_vol_inc_today,
                                totpriinctoday: tot_pri_inc_today,
                                latestvoltoday: coin["24h_volume_usd"],
                                latetpricetoday:coin.price_usd,
                                latestvolincperc:vol_inc_perc,
                                latestusdpriceincperc:price_inc,
                                latestpricelagperc:latestpricelagperc,
                                totpricelagperctoday:totpricelagperctoday,
                                datte:TODAY,
                            },
                                $push: {
                                    Intraday: {
                                        btcprice: coin.price_btc,
                                        volume: coin["24h_volume_usd"],
                                        usdprice: coin.price_usd,
                                        volinc:vol_inc,
                                        usdpriceinc:price_inc,
                                        volincperc:vol_inc_perc,
                                        usdpriceincperc:pri_inc_perc,
                                        totvolinctoday:tot_vol_inc_today,
                                        totpriinctoday:tot_pri_inc_today
                                    }
                                }
                            }, function(err, data) {
                              
                                callback()
                            })

                        }
                    })

 }