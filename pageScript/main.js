console.log('我是pageScripts、main.js');
window.addEventListener('click',()=>{
  console.log('我是pageScripts、main.js, click')
});
async function testFetch(gptkey,question){
  try {
    const response = await fetch(`http://localhost:3000/api?gptkey=${gptkey}&question=${question}`);
    // console.log(response.headers,response)
    const data = await response.json();
    return data
    console.log(data)
  } catch (error) {
    console.error(error);
    // setData('err')
  }
}
// 发送消息给content。js
window.dispatchEvent(
  new CustomEvent('pageScript', {
    // detail: { url: requeseUrl, ruleKey: key },
    detail:{aa:'我是',bb:'main.js'}
  }),
);

// 处理鼠标抬起事件的代码
document.addEventListener('mouseup', async function(event) {
  var selection = window.getSelection().toString();
  if(selection){
    console.log('你选择的文本是：' + selection);
  }
  const mypopComponet = document.querySelector('#chat_gpt_everywhere_by_alyosha')
  const answerDom = document.querySelector('#chat_gpt_everywhere_by_alyosha #answer')
  const resultDom = document.querySelector('#chat_gpt_everywhere_by_alyosha #result')


  console.log(event)
  mypopComponet.style.position = 'absolute'
  mypopComponet.style.left = event.pageX + 'px'
  mypopComponet.style.top = event.pageY+ 'px'
  mypopComponet.style.backgroundColor = '#a34543'

  const question = selection
  answerDom.textContent = question

  resultDom.textContent = 'chatgpt思考中......'
  const result = await testFetch('这应该是一个gptkey',question)
  resultDom.textContent = result.res



});