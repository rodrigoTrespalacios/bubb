import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import { NextAuth } from 'next-auth/client'
import RaisedCard from '../../components/RaisedCard'
import Navbar from '../../components/Navbar'

import "antd/dist/antd.css"
import "../../styles/main.css"

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
  
  handleSignInSubmit = (event) => {
    console.log('adsd')
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
      <React.Fragment>
      <Navbar session={{}} />
      <div className="main-container">
        <style jsx>{`
          .main-container {
            min-height: calc(100vh - 85px);
          }
          .signup-card {
            max-width: 650px;
            margin: auto;
            text-align: center;
          }
          .card-header {
            font-weight: 400;
            margin-bottom: 30px;
          }
          .card-body {
            max-width: 275px;
            margin: auto;
          }
          .login-instructions {
            color: rgb(153, 153, 153);
            font-size: 12px;
            margin-top: 40px;
            margin-bottom: 40px;
          }
          .login-instructions div {
            margin-bottom: 5px;
          }
          .login-instructions b {
            color: hsla(349, 87%, 58%, 1);
          }
        `}</style>
        <div className="signup-card">
          <h1 className="card-header">Log In / Sign Up</h1>
          <div className="card-body">
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
                  <Button htmlType="submit" type="primary" id="submitButton" style={{width: '100%', marginTop: 10}}>LOGIN / SIGNUP</Button>
                </p>
              </form>
            </div>
          </div>
          <div className="login-instructions">
            <div>After submitting the form, we’ll send you an email to confirm your login attempt.</div>
            <div>If it's <b>your first attempt</b>, we will create an account for you at the same time.</div>
          </div>
        </div>
      </div>
      </React.Fragment>
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