import React from 'react'
import Link from 'next/link'

const Navbar = ({user}) => (
  <div className="navbar">
    <div className="navbar-link"><Link href="/0"><a>bubb.as</a></Link></div>
    <div>
      {!user &&
        <div className="navbar-link"><Link href="/0/auth" prefetch>login</Link></div>
      }
      {user &&
        <div className="navbar-link"><Link href="/0/dashboard" prefetch>dashboard</Link></div>
      }
    </div>
  </div>
);

export default Navbar;