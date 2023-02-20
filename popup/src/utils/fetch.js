export async function getChatGPTAnswer (gptkey,question){
  try {
    const response = await fetch(`http://localhost:3000/api?gptkey=${gptkey}&question=${question}`);
    // console.log(response.headers,response)
    const data = await response.json();
    return data
    // console.log(data)
  } catch (error) {
    console.error(error);
    // setData('err')
  }
}