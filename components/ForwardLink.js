import React from 'react'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const LinkList = ({link, onLinkDelete}) => {
  return(
    <div className="list-item">
      <div className="prefix"/>
      <div className="body">
        <div>
          <div style={{fontSize: 14}}>LinkedIn</div>
          <div className="gray">{link}</div>
        </div>
      </div>
      <div className="suffix">
        <Button onClick={() => onLinkDelete(link)} size="small"> <Icon type="delete" /> </Button>
      </div>
    </div>
)};

export default LinkList