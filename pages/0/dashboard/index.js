import Reactc from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { NextAuth } from 'next-auth/client'
import RaisedCard from '../../../components/RaisedCard'
import Navbar from '../../../components/Navbar'
import fetch from 'isomorphic-unfetch'
import LinkList from '../../../components/LinkList'

import "antd/dist/antd.css"
import "../../../styles/main.css"

export default class extends React.Component {
  
  static async getInitialProps({req, res}) {
    const session = await NextAuth.init({req})

    // const linksRes = await fetch(`http://localhost:3000/api/user/links`, {
    //   credentials: 'include'
    // })
    // const data = await linksRes.json()

    if(!session.user) {
      if (res) {
        res.writeHead(302, {
          Location: '/0/auth'
        })
        res.end()
      } else {
        Router.push('/0/auth')
      }
    }
    return {
      session,
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      session: this.props.session,
      links: []
    }
  }
  componentDidMount = () => {
    this.getLinks()
  }
  getLinks() {
    fetch('/api/user/links', {
      credentials: 'include'
    })
    .then(r => r.json())
    .then(data => {
      this.setState({
        links: data.links || []
      })
    })
  }

  handleSignOutSubmit = (event) => {
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
    console.log(this.state.links)
    if (this.props.session.user) {
      return (
        <div className="main-container">
          <Navbar user={this.props.session.user}/>
          <h1>Dashboard</h1>
          <p className="lead mt-3 mb-1">You are signed in as <span className="font-weight-bold">{this.props.session.user.email}</span>.</p>
          {false && <form id="signout" method="post" action="/auth/signout" onSubmit={this.handleSignOutSubmit}>
            <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
            <button type="submit" className="btn btn-outline-secondary">Sign out</button>
          </form>}
          <LinkList links={this.state.links} />
        </div>
      )
    } else {
      return (
        <div>
          Not logged in
        </div>
      )
    }
  }
}