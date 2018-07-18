var express = require('express');
var router = express();

// GET users listing.
router.get('/', function(req, res, next) {
//   res.send('respond with a resource - TEST');
  res.send('list of users. limit: ' + req.param('limit') +
    ' skip: ' + req.param('skip'));
});

// GET users listing.
router.get('/local', function(req, res, next) {
    // 클라이언트 요청에 응답하는 코드.
    // 첫번째 파라미터 - 렌더링 할 뷰 이름
    // 두번째 파라미터 - 페이지 정보
     res.render('index', { title: 'Express' });
});

// 모듈화 시켜 외부에서 사용할 수 있게 추가.
module.exports = router;

/**
 *  -   GET
 *      :   GET함수의 첫번째 파라메터는 /만을 설정한 이유는 app.js 파일에 있다.
 *      :   이미 app.js에 있는 app.use('/users', users) 코드로 라우팅이 설정되어 있기 때문에 user.js 모듈에서는 /만으로 라우팅 설정을 할수 있다.
 * 
 * 
 *  -   req
 *      :   함수의 첫번째 파라메터 req는 클라이언트 응답에 대한 정보를 담는 객체.
 *      :   이 객체는 req.params, req.param(), req.body 등의 함수 혹은 객체를 이용하여 클라이언트로 부터 요청하는 데이터에 접근 할 수 있다.
 *      :   ex ) 유저 전체 데이터가 아니라 페이지네이션을 위해 일부 데이터만 요청하는 경우 GET/ test?limit=10&skip=20 으로 요청할 수 있다.
 * 
 *  -   res
 *      :   클라이언트로 응답을 위한 객체.
 *      :   res.send() 함수를 이용해 문자열을 응답할 수 있다. 이 외에도 응답을 위한 몇 가지 함수를 더 사용할 수 있다.
 *          :   res.send() : 문자열로 응답
 *          :   resjson() : Json 객체로 응답
 *          :   res.render() : 제이트 템플잇을 렌더링
 *          :   res.sendfile() : 파일 다운로드
 */