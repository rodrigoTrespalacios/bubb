import React from 'react'
import Navbar from '../components/Navbar'
import { NextAuth } from 'next-auth/client'
import Page from '../components/Page'
import Icon from 'antd/lib/icon'
import ForwardLink from '../components/ForwardLink'
import Button from 'antd/lib/button'
import Link from 'next/link'

export default class extends React.Component {
  static async getInitialProps ({query, req, res}) {
    const session = await NextAuth.init({req})
    let link = {}
    let headers = {}
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
      if(query.user_id !== String(session.user.id)) {
        const err = new Error()
        err.code = 'ENOENT'
        throw err
      }
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
      link,
      session
    } = this.props
    const links = link.links
    return (
      <div className="main-container">
        <style jsx>{`
          .empty-links {
            text-align: center;
            color: rgba(0,0,0,0.4);
          }
        `}</style>
        <Navbar session={this.props.session} editLink/>
        <div className="main-container">
          <div className="static-notification" style={{textAlign: 'center'}}>
            <Icon type="eye" theme="filled" style={{color:"white", width: 50}}/>
            <div style={{width: '100%'}}>
              This is a private version of your short link. <b>Only you can see this.</b> Buy it to make it available publicly.
            </div>
            <div style={{width: 50}}></div>
          </div>
          <div style={{textAlign: 'center', margin: '50px 0'}}>
            <h2>{link.profileName}</h2>
            <p className="gray" style={{maxWidth: 500, margin: 'auto'}}>{link.profileDescription}</p>
          </div>
          {links && <div className="section">
          {links.map(forwardLink => 
            <ForwardLink link={forwardLink} />
          )}
          </div>}
          {!links && <div className="empty-links">There are no links on this profile yet.</div>}
        </div>
      </div>
    )
  }
}