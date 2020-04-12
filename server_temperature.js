const express = require('express')
const app = express()
app.use(express.json())
port = 5000

mysql = require('mysql'); 
connection = mysql.createConnection({ 
    host: 'localhost', 
    user: 'user1', 
    password: 'user11', 
    database: 'mydb' 
}) 
connection.connect(); 

moment = require('moment')
require('moment-timezone')
moment.tz.setDefault("Asia/Seoul")

function insert_temperatures(id, temp, time, seq) {
    table = {}
    table.device_id = id
    table.temperature = temp
    table.time = time
    table.sequence_number = seq

    query = connection.query('insert into temperatures set ?', table, function(err, rows, cols) { 
        if (err) throw err
        console.log("database insertion ok= %j", table)
    })
}

app.get('/temperature', function(req, res) {
    list = Object.keys(req.query);
    
    if (list.length == 1) {
        str = req.url.split('?')[1]
        console.log(str)
        queryString=''
        
        time = moment().format('YYYY-MM-DD HH:mm:ss');
        date_list = time.split(' ')[0].split('-');
        d = Number(date_list[2])
        M = Number(date_list[1])
        y = Number(date_list[0])
        
        if (d < 2) {
            if (M < 2)
                time.replace(String(y),String(y-1))
            else if(M < 10) {
                time[5] ='0'
                time[6] = String(M).charAt(0)
            }
            else {
                time[5] = String(M).charAt(0)
                time[6] = String(M).charAt(1)
            }
        }
        else {
            if(d < 10) {
                time[5] ='0'
                time[6] = String(d).charAt(0)
            }
            else {
                time[5] = String(d).charAt(0)
                time[6] = String(d).charAt(1)
            }
        }
        
        if (str.length <= 10) { //device_id=  : 10글자
            queryString += 'SELECT * FROM temperatures where time like ' + '"' + time.split(' ')[0] + ' __:__:__' + '"'
        }
        else {
            queryString += 'SELECT * FROM temperatures WHERE ' + list[0] + ' = ' + req.query[list[0]] + ' and ' + 'time like ' + '"' + time.split(' ')[0] + ' __:__:__' + '"'
        }

        console.log(queryString)

        connection.query(queryString, function(err, rows, cols) {
            if (err) throw err;
            str = '{'
            for (i=0; i<rows.length; i++) {
                r = JSON.stringify(rows[i])
                console.log(r)
                str += r
                if (i != rows.length-1) str += ','
            }
            str += '}'
            res.send(str)
        })
    }
    else if (list.length == 3) {
        r = {}
        time = moment().format('YYYY-MM-DD HH:mm:ss')
        insert_temperatures(req.query[list[0]], req.query[list[1]], time, req.query[list[2]])
        
        r.device_id = req.query[list[0]]
        r.status = "ok"
        r.time = time

        console.log(r)
        res.send(JSON.stringify(r))
    }
    else
        res.send('Wrong parameters')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
