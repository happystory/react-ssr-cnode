import React from 'react'
import axios from 'axios'

/* eslint-disable */
export default class TestApi extends React.Component {
  getTopics() {
    axios.get('/api/topics')
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.error(err)
      })
  }

  login() {
    axios.post('/api/user/login', {
      accessToken: '2b1e5a56-ac23-4fef-a977-455af0ba8f7b'
    })
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.error(err)
      })
  }

  markAll() {
    axios.post('/api/message/mark_all?needAccessToken=true')
      .then(resp => {
        console.log(resp)
      })
      .catch(err => {
        console.error(err)
      })
  }

  render() {
    return (
      <div>
        <button onClick={this.getTopics}>topics</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.markAll}>markAll</button>
      </div>
    )
  }
}
/* eslint-enable */
