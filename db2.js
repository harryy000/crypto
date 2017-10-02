//var CoinIntraVol = require('./models1.js').Coinvolume
var mongoose = require('mongoose')
var Schema = mongoose.Schema

//var uri="mongodb://cryptoanal:123123@ds151450.mlab.com:51450/cryptoanal"

var uri="mongodb://localhost/crypto"
mongoose.Promise = global.Promise
const connection = mongoose.connect(uri)
mongoose.connection.on('open',function(){


var Doc = mongoose.model('Doc', new Schema({ name: String}));

var doc = new Doc({
 name: "harish"
})

console.log(doc.name) // [2,3,4]
console.log(doc.save) // [2,3,4]

doc.save(function(err,results){
    console.log(results._id)
    console.log(err)
    mongoose.connection.close();
});
    

 })


