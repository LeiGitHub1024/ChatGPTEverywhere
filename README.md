# ChatGptEveryWhere
Chrome插件，选中一段文字，随时随地ChatGPT

## 初衷
- 想要实现类似**沙拉查词**的功能，随时随地划线，然后调用chatgpt。（这样就省去额外打开一个chagpt进行查询的麻烦）

## 使用说明
#### chrome应用商店
- [已上架](https://chrome.google.com/webstore/detail/chatgpteverywhere/mbffncligbhhdgecingogecdhfdknehb?hl=zh-CN)
#### 使用教程
- [Youtube](https://www.youtube.com/watch?v=dpUtVjIdXWk)

#### 源码
  - 本项目前后端代码均**开源**： [前端](https://github.com/LeiGitHub1024/ChatGPTEverywhere)，[后端](https://github.com/LeiGitHub1024/ChatGPTEverywhereBackEnd)

## 开发日志

### v2版本（doing
todo
- 实现SSE，会话实时展示
- 代码展示
- 支持修改请求配置
- （done）支持快捷关闭插件
- 增加多轮对话能力
- 基础样式升级
#### v1版本（2023.2.21

- 核心思路：项目分为前端插件和后端。
  - 前端插件在运行content.js时，**将一个script注入到用户dom**，这个script负责具体的交互和网络请求。
  - 后端在**vercel部署一个next.js**服务，用来请求chatgpt。
- manifest.json
  ```json
  {
  ...
  "background": {
    "service_worker": "serviceworker.js"
  },
  ...
  "permissions": ["storage"],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["./content.js"],
      "run_at": "document_start",
      "all_frames": true
    }
  ],
  ...
  }
- popup组件（注入到用户dom中的script）
  - 使用react + vite + arcodesign开发，配置了*cssCodeSplit: false*, 保证打包产物为一个单独的js文件。
  - 该组件在每次用户打开**新网页加载完成后**注入到用户dom。与content.js进行通信，读取或存储apikey到chrome.storage。
- 通信（目前通信知识为了存储或读取apikey）
  - popup组件与content.js通信
     - popup发送: **window.dispatchEvent**(new CustomEvent,
     - content.js接收: window.addEventListener("pageScript"
     - content.js发送: 直接**在script标签上setAttribute**
     - popup接收: script标签上getAttribute
  - content.js 与 serviceworker通信：
     - 通过**chrome.runtime**.sendMessage或onMessage



