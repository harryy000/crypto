var doquery=require('./volbot.js')
var cron = require('node-schedule')
console.log('Runs every 10 mins,Started at '+Date())
cron.scheduleJob('*/10 * * * *', function(){
    doquery()
});