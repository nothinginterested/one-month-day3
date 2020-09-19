function jsonp(callbackName, url) {
  return new Promise((resolve, reject) => {

    //succes
    //pending
    //reject
    const random = `${callbackName}` + Math.random();
    window[random] = data => {

      resolve(data)

    };
    const script = document.createElement('script')

    script.src = `${url}?callback=${random}`//模版字符串

    document.body.append(script)
    script.onerror = () => {
      reject('出错了')
    }
    script.onload = () => {
      script.remove()
    }

  })


}

jsonp('LZZCALLBACKNAME', 'http://localhost:8888/friends.js').then(
  data => {
    console.log('--------');
    console.log(data);
    console.log('Promise');
    return '这是第一个then操作'

  }
).then(res => {
  console.log('--------');
  console.log(res);
})
  .catch(
    error => {
      console.log(error);
    })







