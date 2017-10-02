var mongoose=require('mongoose')
var Schema=mongoose.Schema
var uri="mongodb://localhost/cryptoanal"
const connection=mongoose.connect("mongodb://localhost/cryptoanal")
mongoose.connection.on('open',function(){
mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        var cryptoanalSchema=new Schema({
            ccyname:String,
              _id:String,
               exchange:  String,
              baseusdprice:Number,
              Basebtcprice:Number,
               basetime:{ type: Date, default: Date.now },
               basevolume:Number,
              Intraday:[{
                usdprice: String, 
                btcprice: Number ,
                volume: Number ,
                time: { type: Date, default: Date.now }
              }]
        })
        var Cryptoanal=mongoose.model('coinvolume',cryptoanalSchema)
        console.log(Cryptoanal)
        module.exports=Cryptoanal
      }
    })
 })