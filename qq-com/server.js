const http = require("http")
const fs = require("fs")
const url = require("url")
const port = process.argv[2] | 8888


const server = http.createServer((request, response) => {
  const parseUrl = url.parse(request.url, true)
  const path = parseUrl.pathname
  const query = parseUrl.query;
  console.log('有一个傻b发来了请求');
  console.log(path);
  if (path === '/index.html') {
    response.statusCode = 200
    response.setHeader("Content-Type", "text/html;charset=utf-8")
    response.write(fs.readFileSync('./public/index.html'))
    response.end()
  } else if (path === '/qq.js') {
    response.statusCode = 200
    response.setHeader("Content-Type", "text/javascript;charset=utf-8")
    response.write(fs.readFileSync('./public/qq.js'))
    response.end()
  } else if (path === '/friends.json') {
    response.statusCode = 200
    response.setHeader("Access-Control-Allow-Origin", '*')
    response.setHeader("Content-Type", "application/json;charset=utf-8")
    const res = fs.readFileSync('./public/friends.json')
    response.write(res)
    response.end()
  } else if (path === '/friends.js') {
    // console.log('hhhhhhhhhhhh')
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/javascript;charset=utf-8");
    const string = `window['{{xxx}}'] (    {{data}}    )  `
    const string3 = `window.{{xxx}}= {{data}}  `
    const data = fs.readFileSync("./public/friends.json").toString();
    const string2 = string.replace("{{data}}", data).replace('{{xxx}}',query.callback)
    response.write(string2);
    response.end();
  }

})


server.listen(port)
console.log(
  '监听' + port + '' +
  '成功TM的打开http://localhost:' +
  port
)
