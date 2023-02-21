import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'


const my_chatgpt_page_alyosha1024 = document.createElement('div'); 
my_chatgpt_page_alyosha1024.style.zIndex = '2147483647'
my_chatgpt_page_alyosha1024.style.opacity = '0.99'

my_chatgpt_page_alyosha1024.id='chat_gpt_everywhere_by_alyosha'
console.log('1234',document,document?.body)

document.body.appendChild(my_chatgpt_page_alyosha1024);



ReactDOM.createRoot(document.getElementById('chat_gpt_everywhere_by_alyosha')).render(
    <App />
)
