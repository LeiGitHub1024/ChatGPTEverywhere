import { useState } from 'react'
// import reactLogo from './assets/react.svg'
import './App.less'

function App() {
  const [drawerVisible, setDrawerVisible] = useState(false)
  let timeoutIcon// 鼠标悬浮在div上，1秒后展示。
  return (
    <div id='container-chat-alyosha1024'>
    <div id='icon-chat-alyosha1024' 
    onClick={()=>setDrawerVisible(a=>!a)}
    onMouseOver={ () => {timeoutIcon = setTimeout(() => {setDrawerVisible(true);}, 500); }}
    onMouseOut ={()=> clearTimeout(timeoutIcon)}
    >
    </div>
    {drawerVisible&&
      <div id='drawer-chat-alyosha1024' 
        >
        <div style={{display:'flex',alignItems:'center',}}>
        <div className='chatgpt-icon-chat-alyosha1024'></div>
        <div className='chatgpt-text-chat-alyosha1024'>ChatGPT</div>
        </div>
        <div>
          Q: <span id='question-chat-alyosha1024'></span>
        </div>
        <div>
          A:<span id='answer-chat-alyosha1024'></span>
        </div>
    </div>}
    </div>
  )
}

export default App
