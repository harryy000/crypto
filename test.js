var async = require('async')
var dbtimestoday = ["1150", "1152", "1154", "1156", "1158", "1200", "1202", "1204",
    "1206", "1208", "1210", "1212", "1214", "1216", "1218", "1220"
]

var reqdtimearr = ["0000"]

var totlength = dbtimestoday.length - 1
console.log("length of the array is "+totlength)
console.log(dbtimestoday.toString())

function subreccheck(dbtimestoday, cnt, reqdtime, callback) {
    var subdbval = dbtimestoday[cnt]
 
    if (subdbval === reqdtime) {
        
        return callback(cnt)
    } else {
        if (subdbval < reqdtime) {
            
            var finalc = cnt
            return callback(finalc)
        }
        cnt = cnt - 1
        if(cnt===0){
            return callback(cnt)
        }
        subreccheck(dbtimestoday, cnt, reqdtime, callback)

    }
}

function reccheck(dbtimestoday, cnt, totlength, reqdtime, minusval, callback) {
    var dbtime = dbtimestoday[cnt]
    if (dbtime === reqdtime) {
        return cnt
    }
    if (totlength < 10) {
        subreccheck(dbtimestoday, cnt, reqdtime, callback)
    }
    if (dbtime > reqdtime) {
        if ((cnt - minusval) < minusval) {
            subreccheck(dbtimestoday, cnt, reqdtime, callback)
        }
    } else {
        subreccheck(dbtimestoday, cnt, reqdtime, function(retval) {  
            return callback(retval)
        })
    }
}
async.forEachSeries(reqdtimearr, function(reqdtime, callback) {
    var median_cnt = Math.floor((dbtimestoday.length) / 2)
    var dbtime = dbtimestoday[median_cnt]
    if (totlength < 10) {
        
        var minusval = 1
    }
    if (totlength > 10 && totlength < 100) {
        var minusval = 10
    }

    if (totlength > 100 && totlength < 1000) {
        var minusval = 100
    }
    if (reqdtime > dbtime) {
        median_cnt = totlength        
    }
    reccheck(dbtimestoday, median_cnt, totlength, reqdtime, minusval, function(finalcnt) {
        console.log("array position required for "+reqdtime+" is " + finalcnt)
        callback()
    })
}, function(err) {
    console.log("all times done")
})