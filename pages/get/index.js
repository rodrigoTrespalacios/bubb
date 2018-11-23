import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Navbar from '../../components/Navbar'
import { NextAuth } from 'next-auth/client'
import ShortLinkSelect from '../../components/ShortLinkSelect'
import fetch from 'isomorphic-unfetch'

import "antd/dist/antd.css"
import "../../styles/main.css"

export default class extends React.Component {
  static async getInitialProps({req}) {
    // const res = await fetch('http://localhost:3000/api', {
    //   credentials: 'include'
    // })
    // const data = await res.json()
    // console.log(data)
    return {
      session: await NextAuth.init({req})
    }
  }

  async search() {
    const {
      url
    } = this.props
    const search = url.query.q
    const res = await fetch(`http://localhost:3000/api/search/${search}`)
    const data = await res.json()
    console.log(data)
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
  // submitForm (data) {
    // fetch('/api/contact', {
      // method: 'post',
      // headers: {
      //   'Accept': 'application/json, text/plain, */*',
      //   'Content-Type': 'application/json'
      // },
      // body: JSON.stringify(data)
    // }).then((res) => {
    //   res.status === 200 ? this.setState({ submitted: true }) : ''
    // })
  // }
  
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className="main-container">
        <Navbar user={this.props.session.user}/>
        <h1 className="display-4 mt-3 mb-3">Get Link</h1>
        <ShortLinkSelect session={this.props.session} initialValue={this.props.url.query.q || ''} />
      </div>
    )
  }
}