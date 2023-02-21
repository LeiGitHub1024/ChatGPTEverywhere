async function testFetch(){
  try {
    const response = await fetch('http://localhost:3000/api');
    // console.log(response.headers,response)
    const data = await response.json();
    // console.log(data)
  } catch (error) {
    // console.error(error);
    // setData('err')
  }
}

/** 接收 content.js 的信息 */
chrome.runtime.onMessage.addListener(({ type, to, url, ruleKey }) => {
  console.log('content_serviceworker got')
  // testFetch();

});

