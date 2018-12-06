import React from 'react'
import Link from 'next/link'
import { Popover, Button } from 'antd'
import { NextAuth } from 'next-auth/client'
import Router from 'next/router'

function handleSignOutSubmit(event) {
  event.preventDefault()
  NextAuth.signout()
  .then(() => {
    Router.push('/auth/callback')
  })
  .catch(err => {
    Router.push('/auth/error?action=signout')
  })
}

const Navbar = ({session}) => (
  <div className="navbar">
    <div className="navbar-link"><Link href="/"><a>bubb.as</a></Link></div>
    <div>
      {!session.user &&
        <div className="navbar-link"><Link href="/auth" prefetch>login</Link></div>
      }
      {session.user &&
        <React.Fragment>
        <Popover
          placement="bottomRight"
          content={<div>
            <div className="dropdown-link"><Link href="/dashboard" prefetch>dashboard</Link></div>
            <div style={{borderTop: '1px solid rgb(234, 234, 234)', margin: '8px 0px'}} />
            <form id="signout" method="post" action="/auth/signout">
              <input name="_csrf" type="hidden" value={session.csrfToken}/>
              <div className="dropdown-link"><button className="link-button">Sign Out</button></div>
            </form>
          </div>}
          trigger="click"
        >
          <div className="navbar-link"><a href="">account</a></div>
        </Popover>
        </React.Fragment>
      }
    </div>
  </div>
);

export default Navbar