import React from 'react'
import Link from 'next/link'
import "../../styles/main.css"

export default class extends React.Component {

  static async getInitialProps({query}) {
    return {
      email: query.email
    }
  }

  render() {
    return(
      <div className="main-container">
        <style jsx>{`
          .main-container {
          }
          .check-email {
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            transform: translate(0, -60px)
          }
        `}</style>
        <div className="check-email">
        <div>
          <h1 className="display-4 mt-5 mb-3">Check your email</h1>
          <p className="lead">
            A sign in link has been sent to { (this.props.email) ? <span className="font-weight-bold">{this.props.email}</span> : <span>your inbox</span> }.
          </p>
          <p>
            <Link href="/"><a>Home</a></Link>
          </p>
          </div>
        </div>
      </div>
    )
  }
}