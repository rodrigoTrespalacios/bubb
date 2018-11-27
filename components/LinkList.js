import React from 'react'

const Navbar = ({links}) => (
  <div>
    {links.map(link => 
      <div>
        {link.slug}
      </div>
    )}
  </div>
);

export default Navbar;