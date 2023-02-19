async function init(){
  await new Promise(r=>{
    //拿到storage数据，展示在input里。
    chrome.storage.local.get('setting',res=>{
      console.log('res',res)
      document.getElementById('input1').value = (res?.setting?.bans||[]).join(',')
      document.getElementById('input2').value = (res?.setting?.time||[]).join(',')
      /*
      dataForm
      {
        "setting":{
          bans:['bilibili','bytedance',],
          time:['9-12','14-19']
        }
      }
      */
      r()
    })
  })
}
document.getElementById('save1').addEventListener('click',()=>{
  let value = document.getElementById('input1').value.split(',')
  chrome.storage.local.get('setting',res=>{
    res.setting = res.setting || {}
    res.setting.bans = value
    chrome.storage.local.set(res)
  })
})
document.getElementById('save2').addEventListener('click',()=>{
  let value = document.getElementById('input2').value.split(',')
  chrome.storage.local.get('setting',res=>{
    res.setting = res.setting || {}
    res.setting.time = value
    chrome.storage.local.set(res)
  })
})
init()

