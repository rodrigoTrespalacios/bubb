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
      <h1>One Link To Rule Them All</h1>
      <p>
        Your <b>Bubb.as</b> link lets you share all your profiles, pages and links in one page.<br />
        Think of it as your personal business card.
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
            title="Control your online presence"
            body="Who knows what people will find when they Google you. Share your Bubb.aa link with them and have control of what they see about you online."
          />
          <Feature
            title="Your links are always up to date"
            body="There is no incentive for us to share your data."
          />
          <Feature
            title="Share the link in the real world"
            body="Let people find you online the way you want to. Put it on your business card. Your contact will alway find up to date information."
          />
        </div>

        <ProfileExample />

        <Faq />
      </div>
    )
  }
}