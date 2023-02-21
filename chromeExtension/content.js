

const init = async ()=>{
  //获取用户保存的api key
  let apikey
  await new Promise(r=>{
    chrome.storage.local.get('chatgpt_apikey_alyosha1024',res=>{
      // console.log('chrome.storage.local得到key',res?.chatgpt_apikey_alyosha1024?.value)
      apikey = res?.chatgpt_apikey_alyosha1024?.value
      r();
    })
  })
  

  //将popup组件插入用户dom
  const script1 = document.createElement('script');
  script1.setAttribute('id', 'injected_chatgpt_util_by_alyosha1024');
  script1.setAttribute('type', 'text/javascript');
  script1.setAttribute('apikey',apikey)
  script1.setAttribute('crossorigin', true)
  script1.setAttribute('src', chrome.runtime.getURL('./chatgpttooltip-injected-by-alyosha1024.js'));
  document.documentElement.appendChild(script1);
  


  /** 接收pageScript传来的信息，转发给iframe */
  window.addEventListener("pageScript", function (inputObj) {
    // console.log('content.js 接收pagescript传来的信息:',inputObj?.detail?.apikey)
    chrome.storage.local.set({'chatgpt_apikey_alyosha1024':{
      value:inputObj?.detail?.apikey
    }},res=>{
      // console.log('chrome.storage.local设置成功')
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
    // console.log('err1: ', err);
  });


}
init()