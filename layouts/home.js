import React from 'react'
import ShortLinkSearch from '../components/ShortLinkSearch'
import Feature from '../components/Feature'
import ProfileExample from '../components/ProfileExample'
import Faq from '../components/Faq'

function Title() {
  return(
    <React.Fragment>
    <style jsx>{`
      h1 {
        font-size: 48px;
        margin-top: 50px;
        margin-bottom: 40px;
      }
      p {
        font-size: 16px;
        margin-bottom: 50px;
      }
    `}</style>
      <h1>Own Your Own Profile</h1>
      <p>
        <b>Bubb.as</b> makes managning your profile information more transparent. <br />
        Social Login without the social.
      </p>
    </React.Fragment>
  )
}
export default class extends React.Component {

  render() {
    return (
      <div>
        <div style={{textAlign: 'center', marginBottom: 50}}>
          <Title />
        </div>
        <ShortLinkSearch {...this.props} />

        <style jsx>{`
          .features {
            display: flex;
            justify-content: center;
            width: 100%;
            margin-top: 150px;
          }
        `}</style>

        <div className="features">
          <Feature
            title="Easily Create Accounts"
            body="Passwordless login for your application and get a personalized experience."
          />
          <Feature
            title="Privacy"
            body="There is no incentive for us to share your data."
          />
          <Feature
            title="No bloat"
            body="No friends list. Bo infered information. Only login."
          />
        </div>

        <ProfileExample />

        <Faq />
      </div>
    )
  }
}