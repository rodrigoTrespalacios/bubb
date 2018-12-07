import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'
import fetch from 'isomorphic-unfetch'
import ForwardLink from './ForwardLink'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      linkList: props.link.links || [],
      newLink: null
    }
  }

  handleEdit = (data) => {
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
        let linkList = this.state.linkList
        if(data.removeLink) {
          linkList = linkList
        } else {
          linkList = [...linkList, this.state.newLink]
        }
        this.setState({
          linkList: linkList,
          newLink: null
        })
      }
    })
    .catch(err => {
      console.log(err)
    })
  }

  handleLinkSubmit = (event) => {
    event.preventDefault()
    const data = {
      link: this.state.newLink,
      slug: this.props.link.slug,
      removeLink: false,
    }
    this.handleEdit(data)
  }

  handleLinkDelete = (link) => {
    const data = {
      link: link,
      slug: this.props.link.slug,
      removeLink: true,
    }
    this.handleEdit(data)
  }

  handleLinkChange = ({target}) => {
    this.setState({
      newLink: target.value,
    })
  }
  
  render() {
    return (
      <div className="main-container">

        <div className="section">
        <div className="list-item content">
          <div style={{width: '100%'}}>
          <h2>Your Profiles</h2>
          <p style={{margin:0, marginTop: 2}}>Something somehting something</p>
          </div>
        </div>
        {this.state.linkList.map(forwardLink => 
          <ForwardLink link={forwardLink} onLinkDelete={this.handleLinkDelete}/>
        )}
          <div className="list-item input content">
          <form id="signout" method="post" onSubmit={this.handleLinkSubmit}>
            <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
            <Input
              size="default" 
              style={{marginRight: 10}}
              placeholder="https://example.com/username"
              // addonBefore="https://"
              value={this.state.newLink}
              onChange={this.handleLinkChange}
            />
            <Button htmlType="submit" type="primary" disabled={!this.state.newLink}>Add</Button>
          </form>
          </div>
        </div>
      </div>
    )
  }
}