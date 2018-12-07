import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import { TextArea } from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'
import fetch from 'isomorphic-unfetch'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      description: props.link.profileDescription,
      initialDescription: props.link.profileDescription,
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
          initialDescription: this.state.description,
          saved: true
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleDescriptionSubmit = (event) => {
    event.preventDefault()
    const data = {
      description: this.state.description,
      slug: this.props.link.slug,
    }
    this.handleEdit(data)
  }

  handleDescriptionChange = ({target}) => {
    this.setState({
      description: target.value.slice(0, 255),
    })
  }
  
  render() {
     const {
      description,
      initialDescription,
      saving,
      saved
    } = this.state
    return (
      <div className="main-container">

        <div className="section">
        <div className="list-body">
          <div style={{width: '100%'}}>
          <h2>About You</h2>
          <p style={{margin:0, marginTop: 2}}>Please enter your full name, or a display name you are comfortable with.</p>
            <div className="main-input">
              <TextArea
                autosize={{ minRows: 2, maxRows: 6 }}
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
          </div>
        </div>
          <div className="list-item content">
          <div style={{width: '100%'}} className="gray">Please use 256 characters at maximum.</div>
          <form style={{width: 'auto'}} id="signout" method="post" onSubmit={this.handleDescriptionSubmit}>
            <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
            <Button
              htmlType="submit"
              size="small"
              type="primary"
              disabled={description === initialDescription}
              loading={saving}
            >
              {description === initialDescription && saved ? 'SAVED' : 'SAVE'}
            </Button>
          </form>
          </div>
        </div>
      </div>
    )
  }
}