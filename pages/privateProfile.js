import React from 'react'
import Navbar from '../components/Navbar'
import { NextAuth } from 'next-auth/client'
import Page from '../components/Page'
import Icon from 'antd/lib/icon'
import ForwardLink from '../components/ForwardLink'

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
      link
    } = this.props
    return (
      <React.Fragment>
        <Navbar session={this.props.session}/>
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
          <div className="section">
          {link.links.map(forwardLink => 
            <ForwardLink link={forwardLink} />
          )}
          </div>
        </div>
      </React.Fragment>
    )
  }
}