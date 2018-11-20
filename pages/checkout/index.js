import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Navbar from '../../components/Navbar'
import { NextAuth } from 'next-auth/client'
import ShortLinkSelect from '../../components/ShortLinkSelect'
import fetch from 'isomorphic-unfetch'
import Checkout from '../../components/Checkout'
import "antd/dist/antd.css"
import "../../styles/main.css"

export default class extends React.Component {
  static async getInitialProps({req, res}) {
    const session = await NextAuth.init({req})
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
    return {
      session,
    }
  }

  
  render() {
    return (
      <div className="main-container">
        <Navbar user={this.props.session.user}/>
        <Checkout session={this.props.session}/>
      </div>
    )
  }
}