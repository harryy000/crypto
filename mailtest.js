var emailfunc=require('./mail.js')
var doc='just trying again'
sub='20170917 alert for ccy'
emailfunc(doc,sub,function(err,data){
	console.log(data)
	console.log(err)
})