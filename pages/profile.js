import React from 'react'


export default class extends React.Component {
  static async getInitialProps ({query}) {
    // query.slug
    return {}
  }

  render() {
    console.log(this.props.url.query.slug)
    return (
      <div>
        Profile
      </div>
    )
  }
}