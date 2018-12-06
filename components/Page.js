import React from 'react'
import "antd/dist/antd.css"
import "../styles/main.css"

const Page = ({children}) => {
  return(
    <React.Fragment>
      {children}
    </React.Fragment>
)};

export default Page