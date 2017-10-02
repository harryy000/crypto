var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/cryptoanal')
var Cryptotables = require('./cryptoschema.js')
var Bitrextable = Cryptotables.Bitrextable
var lookfor = "2017-09-30T14:00:01.883Z"

var ccy_id = 'BTC-AEON-20171001'
var ccy_id_yest = 'BTC-AEON-20170930'

var curtime = new Date()
var curhours = curtime.getHours()
var curmins = curtime.getMinutes()
curtimecalc = parseInt(curhours + "" + curmins)
console.log(curtimecalc)
//console.log(curtime)

var fiveminsago = new Date()
fiveminsago.setMinutes(fiveminsago.getMinutes() - 5);
//fiveminsago = parseInt(fiveminsago.getHours() + "" + fiveminsago.getMinutes())
fiveminsago=formattime(fiveminsago)
console.log("five mins ago " + fiveminsago)


var twentyminsago = new Date()
twentyminsago.setMinutes(twentyminsago.getMinutes() - 20);
twentyminsago=formattime(twentyminsago)
//twentyminsago = parseInt(twentyminsago.getHours() + "" + twentyminsago.getMinutes())
console.log("twenty mins ago " + twentyminsago)


var fourtyminsago = new Date()
fourtyminsago.setMinutes(fourtyminsago.getMinutes() - 40);
fourtyminsago=formattime(fourtyminsago)
//fourtyminsago = parseInt(fourtyminsago.getHours() + "" + fourtyminsago.getMinutes())
console.log("fourty mins ago " + fourtyminsago)


var onehourago = new Date()
onehourago.setHours(onehourago.getHours() - 1);
onehourago=formattime(onehourago)
//onehourago = parseInt(onehourago.getHours() + "" + onehourago.getMinutes())
console.log("one hour ago " + onehourago)


var twohoursago = new Date()
twohoursago.setHours(twohoursago.getHours() - 2);
twohoursago=formattime(twohoursago)
//twohoursago = parseInt(twohoursago.getHours() + "" + twohoursago.getMinutes())
console.log("two hours ago " + twohoursago)


var fourhoursgo = new Date()
fourhoursgo.setHours(fourhoursgo.getHours() - 4);
fourhoursgo=formattime(fourhoursgo)
//fourhoursgo = parseInt(fourhoursgo.getHours() + "" + fourhoursgo.getMinutes())
console.log("four hours ago " + fourhoursgo)

var eighthoursago = new Date()
eighthoursago.setHours(eighthoursago.getHours() - 8);
eighthoursago=formattime(eighthoursago)
//eighthoursago = parseInt(eighthoursago.getHours() + "" + eighthoursago.getMinutes())
console.log("eight hours ago" + eighthoursago)


var twelvehoursago = new Date()
twelvehoursago.setHours(twelvehoursago.getHours() - 12);
//twelvehoursago = parseInt(twelvehoursago.getHours() + "" + twelvehoursago.getMinutes())
twelvehoursago=formattime(twelvehoursago)
console.log("twelve hours ago " + twelvehoursago)


var twentyfourhrsago = new Date()
twentyfourhrsago.setHours(twentyfourhrsago.getHours() - 24);
//twentyfourhrsago = parseInt(twentyfourhrsago.getHours() + "" + twentyfourhrsago.getMinutes())
twentyfourhrsago=formattime(twentyfourhrsago)
console.log("twenty four hours ago " + twentyfourhrsago)

function formattime(giventime) {
    var hrs = giventime.getHours()
    var mins = giventime.getMinutes()
    if (!hrs) {
        hrs = "0"
    }
    if (mins < 10) {
        mins = "0" + mins
    }
    if (hrs < 10) {
        hrs = "0" + hrs
    }
    return (hrs + "" + mins)
}
Bitrextable.findById(ccy_id, function(err, doc) {
    var dbtimestoday = doc.Intraday.map(function(a) {
        var hrs = a.time.getHours()
        var mins = a.time.getMinutes()
        if (!hrs) {
            hrs = "0"
        }
        if (mins < 10) {
            mins = "0" + mins
        }
        if (hrs < 10) {
            hrs = "0" + hrs
        }
        return (hrs + "" + mins)
    })
})

Bitrextable.findById(ccy_id_yest, function(err, doc) {
    var dbtimesyest = doc.Intraday.map(function(a) {
        var hrs = a.time.getHours()
        var mins = a.time.getMinutes()
        return parseInt((hrs + "" + mins))
    })
    //  console.log(dbtimesyest.lastIndexOf())
    //console.log(dbtimesyest)
})