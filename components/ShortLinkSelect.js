import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import fetch from 'isomorphic-unfetch'
import { Spring, animated } from 'react-spring'

export default class extends React.Component {

  submitForm = () => {
    const data = {
      slug: this.props.search,

    }
    fetch('/api/reserve', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'x-csrf-token': this.props.session.csrfToken,
      },
      body: JSON.stringify(data)
    }).then((res) => {
      if(res.status === 200) {
        this.setState({ submitted: true })
        Router.push({ pathname: '/dashboard'})
      }
    })
  }

  render() {
    const show = this.props.searchResults && this.props.search
    if(!show) return null
    return (
      <Spring
        native
        force
        // items={!show}
        config={{ tension: 1500, friction: 100, precision: 1 }}
        from={{ height: show ? 0 : 140 }}
        to={{ height: show ? 140 : 0 }}
      >
      {props => (
          <animated.div style={Object.assign({}, props, {overflow: 'hidden'})}>
          <div className="raised-card"> 
            <style jsx>{`
              .raised-card {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-left: 40px;
                padding-right: 40px;
                overfl
              }
            `}</style>
            {this.props.searchResults && <div>bubb.as/<b>{this.props.search}</b> is {this.props.searchResults.length > 0 ? ' not ' : ' '} available!</div>}
            <Button type="primary" onClick={this.submitForm}>
             Get it!
            </Button>
          </div>
          </animated.div>
      )}
    </Spring>
  )}
}