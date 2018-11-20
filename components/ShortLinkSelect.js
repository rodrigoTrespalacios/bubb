import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'

export default class extends React.Component {
  
  
  constructor(props) {
    super(props)
    this.state = {
      link: ''
    }
  }

  handleLinkSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.link)
  }

  handleLinkChange = (event) => {
    this.setState({
      link: event.target.value
    })
  }
  
  render() {
    return (
      <div className="main-container">
        <h1>Short Link Select</h1>
        <form id="signout" method="post" onSubmit={this.handleLinkSubmit}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <Input
            size="large"
            addonBefore="bubb.as/"
            onChange={this.handleLinkChange}
          />
        </form>
      </div>
    )
  }
}