
const switchElement = document.querySelector('.arc-switch');

chrome.storage.local.get('ChatGPTEverywhere_switchOff',res=>{ //插件第一次打开时，判断一下当前的状态，来改变组件的展示。
  let ChatGPTEverywhere_switchOff = res?.ChatGPTEverywhere_switchOff;
  if(ChatGPTEverywhere_switchOff){
    switchElement.classList.remove('on')
  }else{
    switchElement.classList.add('on')
  }
})


switchElement.addEventListener('click', function() {
  chrome.storage.local.get('ChatGPTEverywhere_switchOff',res=>{
    let ChatGPTEverywhere_switchOff = res?.ChatGPTEverywhere_switchOff;
    chrome.storage.local.set({'ChatGPTEverywhere_switchOff':!ChatGPTEverywhere_switchOff})
    switchElement.classList.toggle('on');
  })

});