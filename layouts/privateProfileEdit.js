import React from 'react'
import Navbar from '../components/Navbar'
import { NextAuth } from 'next-auth/client'
import Page from '../components/Page'
import AddForwardLinkToProfile from '../components/AddForwardLinkToProfile'
import NameInput from '../components/NameInput'
import DescriptionInput from '../components/DescriptionInput'
import Link from 'next/link'
import Button from 'antd/lib/button'

export default class extends React.Component {

  render() {
    const {
      link,
      session
    } = this.props

    return (
      <React.Fragment>
        <div className="main-container">
          <div style={{textAlign: 'center', marginBottom: 40}}>
            <h2>bubb.as/{link.slug}</h2>
            <p className="gray">Edit your short link</p>
            <Link href={`/${link.slug}/u/${session.user.id}`} prefetch><Button size="medium" type="primary">preview</Button></Link>
          </div>
          <NameInput {...this.props} />
          <DescriptionInput {...this.props} />
          <AddForwardLinkToProfile {...this.props} />
        </div>
      </React.Fragment>
    )
  }
}