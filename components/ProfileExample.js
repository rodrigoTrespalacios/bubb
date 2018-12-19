import React from 'react'
import ForwardLink from './ForwardLink'
import ProfileImage from './ProfileImage'
import Icon from 'antd/lib/icon'

const links = [
  "https://ant.design/components/button/", 
  "https://www.linkedin.com/in/rodrigotrespalacios/"
]
const ProfileExample = ({}) => (
  <div className="raised-card">
    <style jsx>{`
      h1 {
        font-size: 42px
      }
      .body {
        padding: 0 20px 50px 20px;
      }
      .raised-card {
        margin-top: 100px;
        margin-bottom: 100px;
        padding: 0;
        background: #fafafa;
        overflow: hidden;
      }
      .header {
        height: 36px;
        position: relative;
        background: #fff;
        border-bottom: 1px solid rgb(234, 234, 234);
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .red {
        position: absolute;
        background-color: rgb(255, 95, 86);
        left: 13px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .yellow {
        position: absolute;
        background-color: rgb(255, 189, 46);
        left: 33px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .green {
        position: absolute;
        background-color: rgb(39, 201, 63);
        left: 53px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .adress-bar {
        border: 1px solid rgb(234, 234, 234);
        border-radius: 4px;
        height: 22px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        width: 100%;
        position: relative;
        max-width: 350px;
      }
    `}</style>
    <div className="header">
      <div className="red" />
      <div className="yellow" />
      <div className="green" />
      <div className="adress-bar">https://bubb.as/neo <Icon type="reload" style={{position: 'absolute', right: 5, top: 3}} /></div>
    </div>
    <div className="body">
    <div style={{textAlign: 'center', margin: '50px 0'}}>
      <ProfileImage src="http://source.unsplash.com/msnyz9L6gs4/300x300" />
      <h1>Mr. Anderson</h1>
      <p className="gray" style={{maxWidth: 500, margin: 'auto'}}>Otherwise know as Neo</p>
    </div>
    <div className="section">
    {links.map(forwardLink => 
      <ForwardLink link={forwardLink} />
    )}
    </div>
    </div>
  </div>
);

export default ProfileExample