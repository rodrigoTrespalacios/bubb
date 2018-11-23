import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'
import { debounced } from '../utils/helpers'

export default class extends React.Component {

  handleLinkSubmit = (event) => {
    event.preventDefault()
  }

  handleLinkChange = (value) => {
    const slug = value
    const href = `/get?q=${slug}`
    const as = href
    Router.push(href, as, { shallow: true })
  }
  
  debouncedUpdate = debounced(300, value => this.handleLinkChange(value));

  render() {
    return (
      <div className="main-container">
        <h1>Short Link Select</h1>
        <form id="signout" method="post" onSubmit={this.handleLinkSubmit}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <Input
            size="large"
            addonBefore="bubb.as/"
            onChange={({ target: { value } }) => this.debouncedUpdate(value)}
            defaultValue={this.props.initialValue}
          />
        </form>
      </div>
    )
  }
}