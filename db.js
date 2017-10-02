var mongoose=require('mongoose')
var Schema=mongoose.Schema
var uri="mongodb://cryptoanal:123123@ds151450.mlab.com:51450/cryptoanal"
//ar uri="mongodb://localhost/cryptoanal"
const connection=mongoose.connect(uri)
mongoose.connection.on('open',function(){
mongoose.connection.db.listCollections().toArray(function (err, names) {
      if (err) {
        console.log(err);
      } else {
        console.log("comes here")
      	var IntradaySchema=new Schema({
      		ccy:{
      		 type:String
      		},
      		date:{
      			type:Date
      		},
      		volume:{
      			type:Number
      		},
      		usdprice:{
      			type:Number
      		},
      		createdat:{
      			type:Date,
      			default:Date.now
      		}
      	});
        
        var cryptoanalSchema=new Schema({
            ccyname:{
              type:String
            },
        		Intraday:[IntradaySchema]
        });
        var cryptoanal=mongoose.model('coinvolume',cryptoanalSchema)
        var cryptoanalwrite=new cryptoanal({
          ccyname:'BITCOIN'
          // Intraday:[{ccy:'BTC',
           //date:20170415,
           //volume:110000,
           //usdprice:1085}]
           })
      }
       cryptoanalwrite.save(function(err){
        console.log('here comes the error '+ err)
       })
      mongoose.connection.close();
    });
})