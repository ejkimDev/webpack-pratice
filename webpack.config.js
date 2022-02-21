// 여기에 webpack의 기본적인 구성옵션 선언

// require('path') : NodeJs에서 제공하는 전역 모듈
// path.resolve(인수1, 인수2) : 인수1과 인수2를 합쳐주는 기능
// __dirname : NodeJs에서 제공하는 전역 변수 => 현재 파일의 경로를 지칭
const path =  require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  /* entry
  * 파일을 읽어들이기 시작하는 진입점을 설정하는 옵션
  * webpack은 html이 아닌 JavaScript를 진입점으로 사용
  */
  entry: './js/main.js',
  /* output
  * entry를 통해서 읽어들인 파일의 기본적인 연결관계를 webpack이 분석해서 결과물(번들)을 반환하는 설정
  * path : 어느 경로에 반환할 것인지(NodeJs에서 필요로하는 절대 경로 표기)
  * filename : 결과물 파일의 이름
  * clean: true => 기존 만들은 파일 제거
  */    
  output: {
    /* path: path.resolve(__dirname, 'dist'),
    filename: 'main.js', */
    // path, filename을 생략하면 자동적으로 dist 폴더에 entry 옵션과 같은 이름으로 파일을 반환해준다.  
    clean: true
  },
  module: {
    rules: [
      {
        // test : 변환해야할 파일 식별
        test: /\.s?css$/,   // s가 있을수도 있고 없을수도 있고 -> .scss, css로 끝나는 확장자를 찾음(정규표현식 사용)
        // use : 변환을 수행하는 데 사용해야 하는 로더
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      }
    ]
  },
  /*
  * plugins
  * 번들링 후 결과물의 처리 방식 등 다양한 플러그인을 설정하는 옵션
  */
  plugins: [
    // html-webpack-plugin을 통해서 템플릿으로 index.html 지정
    // -> index.html과 entry의 진입점을 합본해서 dist에 만들어줌
    new HtmlPlugin({
      template: './index.html'
    }), 
    // 지정한 경로의 파일을 복사하여 dist 폴더에 만들어줌
    new CopyPlugin({
      patterns: [
        { from : 'static' }   // 루트 경로에 만들어놓은 static 폴더를 의미
      ]
    })
  ],
  devServer: {
    host: 'localhost'
  }
}