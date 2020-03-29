'use strict';
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/get', function(req, res) {
        today = new Date().toISOString().replace(/T/,' ').replace(/\..+/,'')
        ip = req.connection.remoteAddress
        if (ip.substr(0,7) == "::ffff:") ip = ip.substr(7)

        str = '{\"email\":\"95kim2@naver.com\",\"stuno\":\"20141196\",\"time\":\"'
        str += today

        str += '\",\"ip\":\"'
        str += ip
        str += '\"'

        if (Object.keys(req.query).length != 0) {
                qry = req.url.split('?')[1].split('&')
                len = qry.length
                for (i = 0; i < len; i++) {
                        temp = qry[i].split('=')
                        str = str + ',\"'+temp[0]+'\":\"'+temp[1]+'\"'
                }
        }
        str += '}'

        res.send(str)
});

app.post('/', function(req, res){

        today = new Date().toISOString().replace(/T/,' ').replace(/\..+/,'')
        ip = req.connection.remoteAddress
        if (ip.substr(0,7) == "::ffff:") ip = ip.substr(7)

        str = '{\"email\":\"95kim2@naver.com\",\"stuno\":\"20141196\",\"time\":\"'
        str += today

        str += '\",\"ip\":\"'
        str += ip
        str == '\"'

        list = Object.keys(req.body)
        if (list.length != 0) {
                for (i = 0; i < list.length; i++) {
                        str += ',\"'+list[i]+'\",\"'+req.body[list[i]]+'\"'
                }
        }


        str += '}'
        res.send(str)
});

app.listen(port, () =>
        console.log(`server listening on port ${port}!`)
);

