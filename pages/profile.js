import React from 'react'


export default class extends React.Component {
  static async getInitialProps ({query}) {
    // query.slug
    return {}
  }

  render() {
    return (
      <div>
        Profile
      </div>
    )
  }
}