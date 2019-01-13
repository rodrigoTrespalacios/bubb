import React from 'react'
import ShortLinkSearch from '../components/ShortLinkSearch'
import CircleLoader from '../components/CircleLoader'

export default class extends React.Component {

  state = {
    loading: false
  }
  handleOnSelect = () => {
    console.log('handleOnSelect')
    this.setState({loading: true})
  }
  render() {
    if(this.state.loading) return <CircleLoader />
    return (
      <React.Fragment>
        <style jsx>{`
          .wizard-container {
            min-height: calc(100vh - 300px)
          }
          h1 {
            margin-top: 30px;
            margin-bottom: 20px;
          }
          p {
            font-size: 16px;
            margin-bottom: 50px;
          }
        `}</style>
        <div className="wizard-container">
          <div style={{textAlign: 'center', marginBottom: 50}}>
            <h1>Step 1. Choose you short link</h1>
            <p>Choose a short link that you will remember.<br /> This is the link you will share with everyone.</p>
          </div>
          <ShortLinkSearch {...this.props} onSelect={this.handleOnSelect} />
        </div>
      </React.Fragment>
    )
  }
}