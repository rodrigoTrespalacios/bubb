import React from 'react'
import Link from 'next/link'
import Button from 'antd/lib/button'
import Icon from 'antd/lib/icon'

const LinkList = ({link, onLinkDelete}) => {
  return(
    <div style={{position: 'relative'}} className="list-item">
    <a href={link} target="_blank">
      <div className="prefix">
        <Icon type="link" className="gray" style={{fontSize: 35}} />
      </div>
      <div className="body">
        <div>
          <div style={{fontSize: 14}}>LinkedIn</div>
          <div className="gray">{link}</div>
        </div>
      </div>
      <div className="suffix">
        {!onLinkDelete && <Icon type="right" style={{color: 'hsla(349, 87%, 58%, 1)', fontSize: 16}}/>}
      </div>
    </a>
    {onLinkDelete && <Button onClick={() => onLinkDelete(link)} size="small" style={{position: 'absolute', right: 20, top: 30}}> <Icon type="delete" /> </Button>}
    </div>
)};

export default LinkList