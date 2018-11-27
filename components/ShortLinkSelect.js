import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import fetch from 'isomorphic-unfetch'


export default class extends React.Component {

  submitForm = () => {
    const data = {
      slug: this.props.search,

    }
    fetch('/api/reserve', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-csrf-token': this.props.session.csrfToken,
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if(res.status === 200) {
        this.setState({ submitted: true })
        Router.push({ pathname: '/dashboard'})
      }
    })
  }

  render() {
    if(!this.props.searchResults || !this.props.search) return null
    return (
      <div className="main-container">
        {this.props.search} is {this.props.searchResults.length > 0 ? ' not ' : ' '} available.
        <Button onClick={this.submitForm}>
         Get
        </Button>
      </div>
    )
  }
}