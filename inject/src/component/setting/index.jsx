import React,{ useState,useEffect } from 'react'
import { Input,Spin,Link,Button,Message,Popover } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';
const SettingComponent = (props)=>{
  const {askChatGPTAndUpdateUI,apikey,setApikey} = props
  const [settingVisible, setSettingVisible] = useState(false)
  function saveApiKey(){
    // console.log(apikey)
    window.dispatchEvent(
      new CustomEvent('pageScript', {
        detail: { apikey: apikey},
      }),
    );
    setSettingVisible(false)
    let successTip = document.querySelector('#saved-chat-alyosha1024')
    if(successTip){
      successTip.style.display = 'block'
      setTimeout(() => {
        successTip.style.display = 'none'
      }, 500);
    }
    askChatGPTAndUpdateUI()
  }
  return [(<>
    <Link onClick={()=>{setSettingVisible(a=>!a)}}><IconSettings style={{color:'#222'}}/></Link>
    {settingVisible&&
      <div>
        <Popover
          content={
            <span style={{fontSize:12,color:"#222"}}>You can find or create your API key  <a target='_blank' href="https://platform.openai.com/account/api-keys" style={{color:'#38a1db'}}>here</a> </span>                     
          }
        >
        <Input 
          addBefore='API key:' 
          style={{ width: 300 }} 
          allowClear 
          placeholder='input your ChatGPT api key here'
          size='mini'
          value={apikey}
          onChange={(x)=>{setApikey(x)}}
          onPressEnter={saveApiKey}
        />
        <Button size='mini' style={{ backgroundColor: '#f9c89b' }} onClick={saveApiKey} >save</Button>
      </Popover>
      </div>
    }
    <div id='saved-chat-alyosha1024' style={{ display:'none'}}>saved!</div>
  </>),setSettingVisible]


}

export default SettingComponent