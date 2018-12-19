import React from 'react'
import Link from 'next/link'
import Icon from 'antd/lib/icon'

const Footer = ({}) => {
  return(
  <div className="footer">
    <style jsx>{`
      .footer {
        border-top: 1px solid rgb(234,234,234);
        padding: 40px 0 40px 0;
        /*background: #131827;*/
        text-align: center;     
        margin-top: 100px;
      }
      .footer-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p {
        color: rgb(153,153,153);
      }
    `}</style>
    <div className="main-container gray footer-content">
    <b>BUBB.AS</b>
    <p>team@bubb.as — Copyright © 2018 BUBBAS, Inc. All rights reserved.</p>
    </div>
  </div>
)};

export default Footer