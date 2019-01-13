import React from 'react'

const RaisedCard = ({children, style}) => (
  <div className="raised-card" style={style}>
    {children}
  </div>
);

export default RaisedCard;