import React from 'react'
import Link from 'next/link'
import { Table } from 'antd'

const LinkList = ({links, user}) => {
  const columns = [{
  title: 'Name',
  dataIndex: 'slug',
  render: slug => <Link href={`/${slug}/u/${String(user.id)}`}>{slug}</Link>
  },
  {
    title: 'Paid',
    dataIndex: 'paid',
    render: paid => paid ? 'paid' : 'up for grabs'
  },
  {
    title: '',
    dataIndex: 'slug',
    render: slug => <Link href={`/${slug}/u/${String(user.id)}/edit`}>Edit</Link>
  }]
  return(
    <div style={{background: 'white'}}>
      <Table
        columns={columns}
        dataSource={links}
        bordered={false}
        pagination={false}
        size="small"
      />
    </div>
)};

export default LinkList