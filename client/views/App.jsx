import React from 'react'
import { Link } from 'react-router-dom'
import { hot } from 'react-hot-loader'
import Routes from '../config/router'

class App extends React.Component {
  componentDidMount() {
    //
  }

  render() {
    return [
      <div key="banner">
        <Link to="/">首页</Link>
        <Link to="/detail">详情页</Link>
      </div>,
      <Routes key="route" />,
    ]
  }
}

export default hot(module)(App)
