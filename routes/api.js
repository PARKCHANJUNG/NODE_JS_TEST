/**
 * 모듈화하기
 */
var express = require('express')
  , http = require('http')
  , mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'localhost',
    port : 3306,
    user : 'user',
    password : 'password',
    database : 'database'
});

connection.connect(function(err) {
    if (err) {
        console.error('mysql connection error');
        console.error(err);
        throw err;
    }
    console.log('connect Mysql');
});  

// 전체 리스트 가져오기
exports.getGroupList = function (req, res) { 
    connection.query('select * from parking_lot_group', function (err, rows, fields) {    
        res.json(rows);  
    });
};

// 단일 데이터 가져오기
exports.getGroupOne = function (req, res) {
    console.log(req.params);
    // 파라미터 저장.
    var plg_idx = req.params.plg_idx;
    // 데이터 베열로 저장 후.
    var datas = [plg_idx];
    // 쿼리실행 시 datas 매개변수로 넘김.
    connection.query('select * from parking_lot_group where plg_idx = ?', datas, function (err, rows, fields) {    
        // json 형태로 변환
        res.json(rows);
    });
};