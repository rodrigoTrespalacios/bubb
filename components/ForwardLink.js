import React from 'react'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const LinkList = ({link, onLinkDelete}) => {
  return(
    <a className="list-item" href={link} target="_blank">
      <div className="prefix"/>
      <div className="body">
        <div>
          <div style={{fontSize: 14}}>LinkedIn</div>
          <div className="gray">{link}</div>
        </div>
      </div>
      <div className="suffix">
        {onLinkDelete && <Button onClick={() => onLinkDelete(link)} size="small"> <Icon type="delete" /> </Button>}
        {!onLinkDelete && <Icon type="right" />}
      </div>
    </a>
)};

export default LinkList