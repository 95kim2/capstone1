const express = require('express')
const app = express()

const request = require('request')
const parseString = require('xml2js').parseString
const url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService/getUltraSrtNcst?serviceKey=Qn713AqsL%2BWIOgmgYhwquZ8dst48Jitsv7YZTIUFZ6Da9BY%2BoZH6A%2BfE9JDPs8wG6%2FB2HZshuDC%2FZTQuyp70dA%3D%3D&pageNo=1&numOfRows=10&dataType=XML'
function interval() {
        moment = require('moment')
        require('moment-timezone')
        moment.tz.setDefault('Asia/Seoul')
        date = moment().format('YYYY-MM-DD HH:mm:ss')

        tmp_list = date.split(' ')[0].split('-')
        base_date = '' + tmp_list[0] + tmp_list[1] + tmp_list[2]
        tmp_list = date.split(' ')[1].split(':')
        base_time = '' + tmp_list[0] + tmp_list[1]

        urlSend = url + '&base_date=' + base_date + '&base_time=' + base_time + '&nx=61&ny=125'

        request.get(urlSend, function(error, response, body) {
                idx = body.indexOf("T1H")
                body = body.substring(idx,body.length-1)
                idx = body.indexOf("obsrValue")
                body = body.substring(idx+10, body.length-1)
                idx = body.indexOf("obsrValue")
                body = body.substring(0, idx-2)

                urlThingspeak = 'https://api.thingspeak.com/update?api_key=UUDH1P8JFKCIHBKB&field2='+body
                request.get(urlThingspeak)

        });
}

setInterval(interval, 600000)
