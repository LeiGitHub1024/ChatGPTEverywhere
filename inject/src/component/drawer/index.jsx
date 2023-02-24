import { useEffect,useState } from "react"
let mypopComponet = null
let timeoutIcon// 鼠标悬浮在div上，1秒后展示。

const DrawerComponent = (props)=>{
  const {askChatGPTAndUpdateUI,setQuestion,children} = props
  const [drawerVisible, setDrawerVisible] = useState(false)
  useEffect(()=>{
    document.addEventListener('mousedown', async()=>{ //点击页面其他地方，收起整个
      mypopComponet = document.querySelector('#container-chat-alyosha1024')
      if(mypopComponet.style.visibility == 'visible'){
        mypopComponet.style.visibility = 'hidden'
        setDrawerVisible(false)
        // setSettingVisible(false) 之后加上
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
  },[])
  return (<>
      <div id='container-chat-alyosha1024' >
      <div id='icon-chat-alyosha1024' 
      onClick={(e)=>{setDrawerVisible(true);askChatGPTAndUpdateUI();e.stopPropagation()}}
      onMouseDown={(event)=>{event.stopPropagation()}} 
      onMouseUp={(event)=>{event.stopPropagation()}}
      onMouseOver={()=>{timeoutIcon = setTimeout(() => {setDrawerVisible(true);askChatGPTAndUpdateUI();}, 500); }}
      onMouseOut ={()=> clearTimeout(timeoutIcon)}
      >
      </div>
      {drawerVisible&&
      <div id='drawer-chat-alyosha1024'
        onMouseDown={(event)=>{event.stopPropagation()}} 
        onMouseUp={(event)=>{event.stopPropagation()}}
        onClick={(event)=>{event.stopPropagation()}}
        >
            {children}
        </div>
        }
    </div>
  </>)

}

export default DrawerComponent