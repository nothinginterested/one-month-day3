const http = require("http")
const fs = require("fs")
const url = require("url")
const port = process.argv[2] | 9999
if (!port) {
  process.exit(1)
}

const server = http.createServer((request, response) => {
  const parseUrl = url.parse(request.url, true)
  const path = parseUrl.pathname
  console.log('有一个傻b发来了请求');
  console.log(path === '/qq.js');
  if (path === '/index.html') {
    response.statusCode = 200
    response.setHeader("Content-Type", "text/html;charset=utf-8")
    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  }else if(path==='/lzz.js'){
    console.log('hhhhhhhhhhhhhhh')
    response.statusCode = 200
    response.setHeader("Content-Type", "text/javascript;charset=utf-8")
    response.write(fs.readFileSync('./public/lzz.js'))
    response.end()

  }
})


server.listen(port)
console.log(
  '监听' + port + '' +
  '成功TM的打开http://localhost:' +
  port
)
