import React from 'react'
import Link from 'next/link'
import Icon from 'antd/lib/icon'

const Feature = ({title, body}) => {
  return(
  <div className="feature">
    <style jsx>{`
      .feature {
        display: flex;
        padding: 0px 30px;
        max-width: 300px;
      }
      .check {
        background: white;
        width: 28px;
        position: relative;
        left: -20px;
        flex-shrink: 0;
        height: 28px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 2px 5px 15px rgba(0,0,0,0.06);
        border-radius: 50%;
      }
    `}</style>
    <div className="check">
      <Icon type="check" />
    </div>
    <div>
      <h3>{title}</h3>
      <p className="gray">{body}</p>
    </div>
  </div>
)};

export default Feature