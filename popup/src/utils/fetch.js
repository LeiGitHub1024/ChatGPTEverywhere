export async function getChatGPTAnswer(gptkey,question){
  try {
    const site = 'https://nextjs-jw7sgdy8x-leigithub1024.vercel.app/api/chatgpt_alyosha'
    const response = await fetch(`${site}?gptkey=${gptkey}&question=${question}`);
    const data = await response.json();
    return data
    // console.log(data)
  } catch (error) {
    // console.error(error);
    // setData('err')
  }
}