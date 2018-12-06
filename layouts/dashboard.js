import Reactc from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { NextAuth } from 'next-auth/client'
import RaisedCard from '../components/RaisedCard'
import Navbar from '../components/Navbar'
import fetch from 'isomorphic-unfetch'
import LinkList from '../components/LinkList'
import Page from '../components/Page'

export default class extends React.Component {
  
  static async getInitialProps({req, res}) {
    const session = await NextAuth.init({req})
    let headers = {}
    if(req) {
      headers = { Cookie: req.headers.cookie }
    }
    // console.log(headers)
    const linksRes =  await fetch('http://localhost:3000/api/user/links', {
      credentials: 'include',
      headers: headers
    })
    const data = await linksRes.json()
    const links = data.links || []

    if(!session.user) {
      if (res) {
        res.writeHead(302, {
          Location: '/auth'
        })
        res.end()
      } else {
        Router.push('/auth')
      }
    }
    console.log(links)
    return {
      session,
      links
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      session: this.props.session,
    }
  }

  render() {
    if (this.props.session.user) {
      return (
        <div className="main-container">
          <Navbar session={this.props.session}/>
          <h2 className="page-title">Short Links</h2>
          <div className="raised-card">
          <LinkList links={this.props.links} user={this.props.session.user}/>
          </div>
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