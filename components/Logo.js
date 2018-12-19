import React from 'react'

const Logo = ({size, onClick}) => (
  <div className="logo-container" onClick={onClick}>
    <style jsx>{`
      .logo-container {
        font-size: 20px;
        font-family: 'helvetica';
        font-weight: 600;
        position: relative;
        width: 25px;
        height: 25px;
        cursor: pointer;
      }
      .highlight-square {
        width: 14px;
        height: 30px;
        background: hsla(349, 87%, 58%, 1);
        position: absolute;
        top: 0;
        left: -7px;
        z-index: 1;
      }
      .letters {
        top: 0;
        position: absolute;
        z-index: 2;
      }
    `}</style>
    <div className="letters">
        BB
    </div>
    <div className="highlight-square"/>
  </div>
);

export default Logo