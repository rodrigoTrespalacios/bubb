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
    const res = await fetch('http://localhost:3000/api')
    const data = await res.json()
    console.log(data)
    return {
      session: await NextAuth.init({req})
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
        <ShortLinkSelect session={this.props.session} />
      </div>
    )
  }
}