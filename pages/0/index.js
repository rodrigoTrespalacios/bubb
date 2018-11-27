import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import "antd/dist/antd.css"
import "../../styles/main.css"
import Navbar from '../../components/Navbar'
import { NextAuth } from 'next-auth/client'

export default class extends React.Component {
  static async getInitialProps({req}) {
    return {
      session: await NextAuth.init({req})
    }
  }

  constructor(props) {
    super(props)
    this.handleSignOutSubmit = this.handleSignOutSubmit.bind(this)
  }

  handleSignOutSubmit(event) {
    event.preventDefault()
    NextAuth.signout()
    .then(() => {
      Router.push('/auth/callback')
    })
    .catch(err => {
      Router.push('/auth/error?action=signout')
    })
  }
  
  render() {
    return (
      <div className="main-container">
        <Navbar user={this.props.session.user}/>
        <h1 className="display-4 mt-3 mb-3">NextAuth Example</h1>
        <p className="lead mt-3 mb-3">An example of how to use the <a href="https://www.npmjs.com/package/next-auth">NextAuth</a> module.</p>
      </div>
    )
  }
}