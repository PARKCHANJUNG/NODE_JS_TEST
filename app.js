
/**
 * 안녕!@@@@@@@@@@@@
 * Module dependencies.
 * 23232
 * 
 * Express 웹프레임워크
 * 		- 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하고 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크.
 * 		- 가볍고 유연하게 웹 프레임워크을 구성할 수 있는 장점.
 * 		- 미들웨어 구조 때문에 가능.
 * 구성
 * 		- package,json 
 * 			: 노드에서는 package.json 파일에 프로그램 이름, 저번 등 노드 프로그램의 정보를 기술한다.
 * 			: 필요에 따라 다양한 모듈을 함꼐 사용하는데 이러한 모듈들의 목록을 package.json에 나열한다.
 * 			: npm은 이 정보를 참고하여 필요한 모듈을 모두 설치할 수 있는 것이다.
 * 
 * 		- app.js
 * 			: bin.www에서 사용되는 이 파일은 익스프레스 설정 파일이 담겨있는 핵심코드이다.
 * 			: 주요 설정 코드 -
 * 				: morgan : 클라이언트의 HTTP 요청 정보를 로깅하기 위한 모듈.
 * 				: body-parser : 클라이언트의 HTTP 요청 중 POST 요청의 바디 데이터에 접근하기 위한 모듈.
 * 				: cookie-parser : 접속한 클라이언트의 쿠키정보에 접근하기 위한 모듈.
 * 				: express.statis() : 정적 파일 호스팅을 위한 경로 설정.
 * 				: app.use('/', routes) : 라우팅 설정. 세부 라우팅은 /routes 폴더에 구현됨.
 * 		- routes
 * 			========================================================================
 * 			// routes/index.js
 *			var express = require('express');
 *			var router = express.Router();
 * 
 *			router.get('/', function(req, res, next) {
 * 				res.render('index', { title: 'Express' });
 *			});
 *
 *			module.exports = router;
 *
 * 			========================================================================
 * 
 * 			: 라우팅을 위한 폴더이다. 라우팅 리소스 별로 모듈을 만들어 라우팅 로직을 각 파일에 구현한다.
 * 				: express.Router() : 객체를 이용해 라우팅 로직을 설정합니다. 라우트 객체는 router는 get()함수를 이용해 / URL로 호출되었을 경우 어던 로직을 수행하도록 한다.
 * 				: 파라메터인 콜백함수는 세 개의 파라메터를 갖는다.
 * 					: req는 클라이언트 요청정보를 담은 객체.
 * 					: res는 요청한 클라이언트로 응답을 위한 객체.
 *					: next는 다음 로직 수행을 위한 함수명.
 *				: 위 코드는 클라이언트로부터 GET/ 호출이 있을 경우, 뭔가를 렌더링하라는 의미.
 *
 * 		- public
 * 			: 정적 파일을 위한 폴더로서 자바스크립트 파일, 이미지 파일, 스타일시트 등을 포함.
 * 			: 브라우저에 로딩된 HTML 파일에서 해당 파일을 호출하면 내려주는 역할. 
 */

var express = require('express')
  , routes = require('./routes')
  // 미리 구현한 라우팅 모듈을 가져온다.
  , user = require('./routes/user')
  , api = require('./routes/api')
  , test = require('./routes/test')
  , http = require('http')
  , path = require('path')
  , mysql = require('mysql');

var app = express();

// ==============================================================================================START DB CONFIG
// var connection = mysql.createConnection({
//     host    :'localhost',
//     port : 3306,
//     user : 'user',
//     password : 'password',
//     database : 'database'
// });

// connection.connect(function(err) {
//     if (err) {
//         console.error('mysql connection error');
//         console.error(err);
//         throw err;
//     }
//     console.log('connect Mysql');
// });
// ==============================================================================================ENN DB CONFIG

// all environments
app.set('port', process.env.PORT || 3000);

// /views 폴더에 있는 ejs 파일을 렌더링할 수 있는 준비가 완료.
// view 경로설정
app.set('views', __dirname + '/views');
// view engine ejs로 설정
app.set('view engine', 'ejs');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// ==============================================================================================START QUERY
// app.get('/test', function (req, res) {  
//     connection.query('select * from parking_lot_group', function (err, rows, fields) {    
//         res.json(rows);  
//     });
// });
// ==============================================================================================END QUERY


// **********************************************************************************************방식 1 START
/**
 * GET : router.get();
 * POST : router.post();
 * PUT : router.put();
 * DELETE : router.delete();
 */
// URL에 따라 라우팅 모듈을 설정한다.
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/api/groupList', api.getGroupList);
app.get('/api/groupOne/:plg_idx', api.getGroupOne);
// **********************************************************************************************방식 1 END




// **********************************************************************************************방식 2 START
/**
 * 
 */
app.use('/test', test);
// **********************************************************************************************방식 2 END


/**
 * ERROR CHECK
 * 
 * req : 클라이언트 요청정보를 담은 객체.
 * res : 요청한 클라이언트로 응답을 위한 객체.
 * next : 다음 로직 수행을 위한 함수명.
 */
app.use(function (req, res, next) {
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});

if ('development' == app.get('env')) {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

app.use(function(err, req, res){
	res.status(err.status || 500);
	res.render("error", {
		message: err.message,
		error: {}
	});
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
