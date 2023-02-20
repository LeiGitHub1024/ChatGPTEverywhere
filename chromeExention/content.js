

const init = async ()=>{
  //获取用户保存的api key
  await new Promise(r=>{
    chrome.storage.local.get('chatgpt-apikey-alyosha1024',res=>{
      console.log('chrome.storage.local得到',res)
      window['chatgpt-apikey-alyosha1024'] = res
      r();
    })
  })
  

  //将popup组件插入用户dom
  const script1 = document.createElement('script');
  script1.setAttribute('type', 'text/javascript');
  script1.setAttribute('crossorigin', true)
  script1.setAttribute('src', chrome.runtime.getURL('./chatgpttooltip-injected-by-alyosha1024.js'));
  document.documentElement.appendChild(script1);
  
  //将main.js插入用户dom
  const script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', chrome.runtime.getURL('pageScript/main.js'));
  document.documentElement.appendChild(script);

  // load时间
  script.addEventListener('load', () => {
    console.log('main.js插入完成  ')
  });

  chrome.storage.local.set({'setting':{
    bans:['balabala'],
    time:['0-24']
  }},res=>{
    console.log('chrome.storage.local设置成功')
  })
  


  /** 接收pageScript传来的信息，转发给iframe */
  window.addEventListener("pageScript", function (input1) {
    console.log('content.js 接收pagescript传来的信息')
    chrome.storage.local.set({'chatgpt-apikey-alyosha1024':{
      value:input1
    }},res=>{
      console.log('chrome.storage.local设置成功')
    })
    // chrome.runtime.sendMessage({ type: 'ajaxInterceptor', to: 'content_to_background', ...event.detail }).catch(err => {
    //   console.log('err: ', err);
    // });
    // chrome.runtime.sendMessage({ type: 'ajaxInterceptor', to: 'content_to_iframe', ...event.detail }).catch(err => {
    //   console.log('err: ', err);
    // });
    
  }, false);

  // content => serviceworker，通过 chrome.runtime 通信
  chrome.runtime.sendMessage({ type: 'ajaxInterceptor', to: 'content_to_background', content:'小黑子' }).catch(err => {
    console.log('err1: ', err);
  });






}
init()