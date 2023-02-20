import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

console.log('123',document)
const div = document.createElement('div'); 
div.id='chat_gpt_everywhere_by_alyosha'
document.body.appendChild(div);

ReactDOM.createRoot(document.getElementById('chat_gpt_everywhere_by_alyosha')).render(
    <App />
)
