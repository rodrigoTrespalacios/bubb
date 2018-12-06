import React from 'react'
import Navbar from '../components/Navbar'
import { NextAuth } from 'next-auth/client'
import Page from '../components/Page'

export default class extends React.Component {
  static async getInitialProps ({query, req, res}) {
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
    } else {
      // console.log(typeof query.user_id)
      // console.log(typeof String(session.user.id))
      // console.log(query.user_id === String(session.user.id))
      if(query.user_id !== String(session.user.id)) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }
    }
   
    return {
      session,
    }
  }

  render() {
    return (
      <React.Fragment>
        <Navbar session={this.props.session}/>
        <div className="main-container">
          This is a private version of your short link. Only you can see this. Buy it to make it available publicly.
        </div>
      </React.Fragment>
    )
  }
}