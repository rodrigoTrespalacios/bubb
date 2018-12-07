import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      name: props.link.profileName,
      initialName: props.link.profileName,
      saving: false,
      saved: false
    }
  }

  handleEdit = (data) => {
    this.setState({saving: true})
    fetch('http://localhost:3000/api/link/edit', {
        method: 'post',
        headers: {
          'x-csrf-token': this.props.session.csrfToken,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((res) => {
      if (res.status === 200) {
        this.setState({
          saving: false,
          initialName: this.state.name,
          saved: true
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleNameSubmit = (event) => {
    event.preventDefault()
    const data = {
      name: this.state.name,
      slug: this.props.link.slug,
    }
    this.handleEdit(data)
  }

  handleNameChange = ({target}) => {
    this.setState({
      name: target.value.slice(0, 47),
    })
  }
  
  render() {
    const {
      name,
      initialName,
      saving,
      saved
    } = this.state
    return (
      <div className="main-container">

        <div className="section">
        <div className="list-body">
          <div style={{width: '100%'}}>
          <h2>Your Name</h2>
          <p style={{margin:0, marginTop: 2}}>Please enter your full name, or a display name you are comfortable with.</p>
            <div className="main-input">
              <Input
                size="default" 
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
          </div>
        </div>
          <div className="list-item content">
          <div style={{width: '100%'}} className="gray">Please use 48 characters at maximum.</div>
          <form style={{width: 'auto'}}id="signout" method="post" onSubmit={this.handleNameSubmit}>
            <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
            <Button
              htmlType="submit"
              size="small"
              type="primary"
              disabled={name === initialName}
              loading={saving}
            >
              {name === initialName && saved ? 'SAVED' : 'SAVE'}
            </Button>
          </form>
          </div>
        </div>
      </div>
    )
  }
}