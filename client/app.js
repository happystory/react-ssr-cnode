import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

// 服务端渲染，将 render 改为 hydrate
ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
)
