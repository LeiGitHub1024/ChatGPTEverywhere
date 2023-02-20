import { useState,useEffect } from 'react'
import './App.less'
import {getChatGPTAnswer} from  './utils/fetch.js'
import { Input,Spin,Link,Button,Message,Popover } from '@arco-design/web-react';
import { IconSettings } from '@arco-design/web-react/icon';

import "@arco-design/web-react/dist/css/arco.css";
let mypopComponet = null

function App() {
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [spin, setSpin] = useState(false)
  const [settingVisible, setSettingVisible] = useState(false)
  const [apikey, setApikey] = useState('')
  useEffect(() => {
    document.addEventListener('mousedown', async()=>{ //点击页面其他地方，收起整个
      mypopComponet = document.querySelector('#container-chat-alyosha1024')
      if(mypopComponet.style.visibility == 'visible'){
        mypopComponet.style.visibility = 'hidden'
        setDrawerVisible(false)
        setSettingVisible(false)
      }
    })
    document.addEventListener("mouseup", async function(event) {//选中一段文字后，展示我的小图标
      var question = window.getSelection().toString();
      if(!question){return }
      setQuestion(question)
      mypopComponet = document.querySelector('#container-chat-alyosha1024')
      mypopComponet.style.left = event.pageX +20 +'px'
      mypopComponet.style.top = event.pageY +20 +'px'
      mypopComponet.style.visibility = 'visible'
    });
    const savedApiKey = window['chatgpt-apikey-alyosha1024']//加载用户保存的apiKey
    if(savedApiKey){
      setApikey(saveApiKey)
    }
  }, [])
  function saveApiKey(){
    console.log(apikey)
    window.dispatchEvent(
      new CustomEvent('pageScript', {
        input1:apikey
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
  }
  let timeoutIcon// 鼠标悬浮在div上，1秒后展示。
  async function askChatGPTAndUpdateUI(gptkey,questio) {
    setSpin(true)
    setAnswer('')
    const responseData = await getChatGPTAnswer(gptkey,questio)
    console.log(responseData)
    setAnswer(responseData.res)
    setSpin(false)
  }
  return (
      <div id='container-chat-alyosha1024' >
          <div id='icon-chat-alyosha1024' 
          onClick={(e)=>{setDrawerVisible(true);askChatGPTAndUpdateUI(apikey,question);e.stopPropagation()}}
          onMouseDown={(event)=>{event.stopPropagation()}} 
          onMouseUp={(event)=>{event.stopPropagation()}}
          onMouseOver={()=>{timeoutIcon = setTimeout(() => {setDrawerVisible(true);askChatGPTAndUpdateUI(apikey,question);}, 500); }}
          onMouseOut ={()=> clearTimeout(timeoutIcon)}
          >
          </div>
          {drawerVisible&&
          <div id='drawer-chat-alyosha1024'
            onMouseDown={(event)=>{event.stopPropagation()}} 
            onMouseUp={(event)=>{event.stopPropagation()}}
            onClick={(event)=>{event.stopPropagation()}}
            >
                {/* <div>这里展示一个搜索框+一个确认搜索图标+配置中心</div> */}
                <div style={{display:'flex', alignItems:'center', marginBottom:10}}>
                  <div className='chatgpt-icon-chat-alyosha1024'></div>
                  <div className='chatgpt-text-chat-alyosha1024'>ChatGPT</div>
                  <Link onClick={()=>{setSettingVisible(a=>!a)}}><IconSettings style={{color:'#222'}}/></Link>
                  {settingVisible&&
                    <div>
                      <Popover
                        content={
                          <span style={{fontSize:12,color:"#222"}}>You can find or create your API key  <a target='_blank' href="https://platform.openai.com/account/api-keys" style={{color:'#38a1db'}}>here</a> </span>                     
                        }
                      >
                      <Input 
                        addBefore='API key' 
                        style={{ width: 300 }} 
                        allowClear 
                        placeholder='input your apikey'
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
                </div>
                <div  style={{display:'flex'}}>
                  <span>Q：</span> <span id='question-chat-alyosha1024'>{question}</span>
                </div>
                <div  style={{display:'flex'}}>
                  <span>A： </span> <span id='answer-chat-alyosha1024'>{spin&&<Spin dot />}{answer}</span>
                </div>
            </div>
            }
      </div>
  
    
  )
}

export default App
