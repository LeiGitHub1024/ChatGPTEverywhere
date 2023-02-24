import { useState,useEffect } from 'react'
import './App.less'
import {getChatGPTAnswer} from  './utils/fetch.js'
import { Spin } from '@arco-design/web-react';
import "@arco-design/web-react/dist/css/arco.css";

import SettingComponent from './component/setting';
import DrawerComponent from './component/drawer';

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [answerShow, setAnswerShow] = useState('')
  const [spin, setSpin] = useState(false)
  const [apikey, setApikey] = useState('')
  useEffect(() => {
    //加载用户保存的apiKey
    var scriptTag = document.querySelector('#injected_chatgpt_util_by_alyosha1024');
    var savedApiKey = scriptTag?.getAttribute('apikey');
    if(savedApiKey){
      setApikey(savedApiKey)
    }else{
      setSettingVisible(true) 
    }
  }, [])
  

  async function askChatGPTAndUpdateUI() {
    setSpin(true)
    setAnswer('')
    const responseData = await getChatGPTAnswer(apikey,question)
    setAnswer(responseData?.res)
    setSpin(false)
  }

  const [settingElement, setSettingVisible] = SettingComponent({
    askChatGPTAndUpdateUI,
    apikey,
    setApikey
  });
  return (
      <DrawerComponent askChatGPTAndUpdateUI={askChatGPTAndUpdateUI} setQuestion={setQuestion}>
        <div>
          <div style={{display:'flex', alignItems:'center', marginBottom:10}}>
            {/* <div className='chatgpt-icon-chat-alyosha1024'></div> */}
            <div className='chatgpt-text-chat-alyosha1024'>ChatGPT</div>
            {settingElement}
          </div>
          <div  style={{display:'flex'}}>
            <span>Q：</span> <span id='question-chat-alyosha1024'>{question}</span>
          </div>
          <div  style={{display:'flex'}}>
            <span>A： </span> <span id='answer-chat-alyosha1024'>{spin&&<Spin dot style={{marginTop:-10}} size={6}/>}{answer}</span>
          </div>
        </div>
      </DrawerComponent>
  
    
  )
}

export default App
