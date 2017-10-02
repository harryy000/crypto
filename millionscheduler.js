var Runiterations=require('./milliondollarbot.js')
var cron = require('node-schedule')
console.log('Runs every 2 mins,Started at '+Date())
cron.scheduleJob('*/2 * * * *', function(){
    Runiterations()
});