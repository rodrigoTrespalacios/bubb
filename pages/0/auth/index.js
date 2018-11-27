import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { NextAuth } from 'next-auth/client'
import RaisedCard from '../../../components/RaisedCard'
import Navbar from '../../../components/Navbar'

import "antd/dist/antd.css"
import "../../../styles/main.css"

export default class extends React.Component {
  
  static async getInitialProps({req, res}) {
    const session = await NextAuth.init({req})
    if(session.user) {
      if (res) {
        res.writeHead(302, {
          Location: '/dashboard'
        })
        res.end()
      } else {
        Router.push('/dashboard')
      }
    }
    return {
      session: session,
      linkedAccounts: await NextAuth.linked({req}),
      providers: await NextAuth.providers({req})
    }
  }
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      session: this.props.session
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)  
    this.handleSignInSubmit = this.handleSignInSubmit.bind(this)
  }
    
  handleEmailChange(event) {
    this.setState({
      email: event.target.value
    })
  }
  
  handleSignInSubmit(event) {
    event.preventDefault()
    
    if (!this.state.email) return

    NextAuth.signin(this.state.email)
    .then(() => {
      Router.push(`/auth/check-email?email=${this.state.email}`)
    })
    .catch(() => {
      Router.push(`/auth/error?action=signin&type=email&email=${this.state.email}`)
    })
  }
  
  render() {
    return (
      <RaisedCard>
        <h1 className="card-header">Log In to BUBB</h1>
        <div className="card-body pb-0">
          <SignInButtons providers={this.props.providers}/>
          <div>
            <form id="signin" method="post" action="/auth/email/signin" onSubmit={this.handleSignInSubmit}>
              <input name="_csrf" type="hidden" value={this.state.session.csrfToken}/>
              <Input
                name="email"
                id="email"
                onChange={this.handleEmailChange}
                // onPressEnter={this.sendEmail}
                type="email"
                required
                placeholder="you@domain.com"
                prefix={<Icon
                    type="mail"
                    theme="outlined"
                  />}
              />
              <p className="text-right">
                <Button id="submitButton" type="submit">LOGIN</Button>
              </p>
            </form>
          </div>
        </div>
      </RaisedCard>
    )
  }
}

export class LinkAccounts extends React.Component {
  render() {
    return (
      <div className="card mt-3 mb-3">
        <h4 className="card-header">Link Accounts</h4>
        <div className="card-body pb-0">
          {
            Object.keys(this.props.linkedAccounts).map((provider, i) => {
              return <LinkAccount key={i} provider={provider} session={this.props.session} linked={this.props.linkedAccounts[provider]}/>
            })
          }
        </div>
      </div>
    )
  }
}

export class LinkAccount extends React.Component {
  render() {
    if (this.props.linked === true) {
      return (
        <form method="post" action={`/auth/oauth/${this.props.provider.toLowerCase()}/unlink`}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <p>
            <button className="btn btn-block btn-outline-danger" type="submit">
              Unlink from {this.props.provider}
            </button>
          </p>
        </form>
      )
    } else {
      return (
        <p>
          <a className="btn btn-block btn-outline-primary" href={`/auth/oauth/${this.props.provider.toLowerCase()}`}>
            Link with {this.props.provider}
          </a>
        </p>
      )
    }
  }
}

export class SignInButtons extends React.Component {
  render() {
    return (
      <React.Fragment>
        {
          Object.keys(this.props.providers).map((provider, i) => {
            return (
              <p key={i}>
                <a className="btn btn-block btn-outline-secondary" href={this.props.providers[provider].signin}>
                  Sign in with {provider}
                </a>
              </p>
              )              
          })
        }
      </React.Fragment>
    )
  }
}