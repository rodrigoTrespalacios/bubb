import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Navbar from '../components/Navbar'
import Page from '../components/Page'
import { NextAuth } from 'next-auth/client'
import ShortLinkSearch from '../components/ShortLinkSearch'
import ShortLinkSelect from '../components/ShortLinkSelect'
import PrivateProfileEdit from '../layouts/privateProfileEdit'

export default class extends React.Component {
  static async getInitialProps({req}) {
    const session = await NextAuth.init({req})
    let headers = {}
    let link = null
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

  constructor(props) {
    super(props)
    this.handleSignOutSubmit = this.handleSignOutSubmit.bind(this)
    this.state = {
      searchResults: null,
      search: null
    }
  }

  async componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps) {
    const { pathname, query } = this.props.url

    // verify props have changed to avoid an infinite loop
    if (query.q !== prevProps.url.query.q) {
      // fetch data based on the new query
      this.search()
    }
  }
  
  async search() {
    const {
      url
    } = this.props
    const search = url.query.q
    const res = await fetch(`http://localhost:3000/api/search/${search}`)
    const data = await res.json()
    this.setState({searchResults: data.links || [], search})
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
        <Navbar session={this.props.session}/>
        <ShortLinkSearch session={this.props.session} initialValue={this.props.url.query.q || ''} />
        <ShortLinkSelect searchResults={this.state.searchResults} search={this.state.search} session={this.props.session}/>
        <PrivateProfileEdit {...this.props} />
      </div>
    )
  }
}