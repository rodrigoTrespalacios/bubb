import React from 'react'
import Navbar from '../components/Navbar'
import { NextAuth } from 'next-auth/client'
import Page from '../components/Page'
import AddForwardLinkToProfile from '../components/AddForwardLinkToProfile'
import NameInput from '../components/NameInput'
import DescriptionInput from '../components/DescriptionInput'

export default class extends React.Component {

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        <div className="main-container">
          <NameInput {...this.props} />
          <DescriptionInput {...this.props} />
          <AddForwardLinkToProfile {...this.props} />
        </div>}
      </React.Fragment>
    )
  }
}