import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { NextAuth } from 'next-auth/client'
import PrivateProfileEdit from '../layouts/privateProfileEdit'
import Home from '../layouts/home'

export default class extends React.Component {
  static async getInitialProps({req}) {
    const session = await NextAuth.init({req})
    let headers = {}
    let link = {}
    if(session.user) {
      if(req) {
        headers = { Cookie: req.headers.cookie }
      }
      const linkRes =  await fetch(`http://localhost:3000/api/user/link`, {
        credentials: 'include',
        headers: headers
      })
      link = await linkRes.json()
    }
    return {
      session,
      link
    }
  }
  
  render() {
    const {
      session,
      link
    } = this.props

    return (
      <div className="main-container">
        <Navbar session={session}/>
        {!session.user && <Home {...this.props} />}
        {(session.user && link.slug) && <PrivateProfileEdit {...this.props} />}
      </div>
    )
  }
}