import React from 'react'
import Link from 'next/link'
import Icon from 'antd/lib/icon'
import Collapse from 'antd/lib/collapse';

const Panel = Collapse.Panel;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const customPanelStyle = {
  // background: '#fafafa',
  borderColor: 'rgb(234, 234, 234)',
  // fontWeight: 400,
  background: '#fafafa',
  borderRadius: 4,
  // marginBottom: 24,
  // border: 0,
  overflow: 'hidden',
  // borderRadius: 4,
  // marginBottom: 24,
  // border: 0,
  // overflow: 'hidden',
};

const Faq = ({title, body}) =>
  <div className="faq">
    <style jsx>{`
      .faq {
        text-align: center;
      }
      h2 {
        font-weight: 600;
        font-size: 32px;
      }
      .accordion {
        max-width: 650px;
        margin: auto;
        margin-top: 50px;
        margin-bottom: 100px;
        
        text-align: left;
      }
    `}</style>
    <h2>Frequently Asked Questions</h2>
    <p>Your questions answered</p>
    <div className='accordion raised-card' style={{padding: 0}}>
    <Collapse defaultActiveKey={['0']} bordered={false} accordion>
      <Panel header="This is panel header 1" key="1" style={customPanelStyle}>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 2" key="2" style={customPanelStyle}>
        <p>{text}</p>
      </Panel>
      <Panel header="This is panel header 3" key="3" style={customPanelStyle}>
        <p>{text}</p>
      </Panel>
    </Collapse>
    </div>

  </div>
;

export default Faq