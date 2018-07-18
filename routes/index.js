
/*
 * GET home page.
 */

exports.index = function(req, res){
  // res.render()로 클라이언트 요청에 응답하는 코드.
  // 첫번째 파라메터는 'index'페이지를 렌더링한다는 의미.
  // 두번째 파라메터는 페이지정보 및 데이터를 의미.
  res.render('index', { title: 'Express' });
};

/**
 *
 * 
 */