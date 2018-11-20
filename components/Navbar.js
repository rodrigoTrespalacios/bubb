import React from 'react'
import Link from 'next/link'

const Navbar = ({user}) => (
  <div className="navbar">
    <div className="navbar-link"><Link href="/"><a>bubb.as</a></Link></div>
    <div>
      {!user &&
        <div className="navbar-link"><Link href="/auth" prefetch>login</Link></div>
      }
      {user &&
        <div className="navbar-link"><Link href="/dashboard" prefetch>dashboard</Link></div>
      }
    </div>
  </div>
);

export default Navbar;