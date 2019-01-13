import React from 'react'
import Router from 'next/router'
import Button from 'antd/lib/button'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import RaisedCard from './RaisedCard'
import { debounced } from '../utils/helpers'
import ShortLinkSelect from '../components/ShortLinkSelect'

export default class extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchResults: null,
      search: this.formatValue(props.url.query.q) || ''
    }
  }


  handleLinkSubmit = (event) => {
    event.preventDefault()
  }

  async componentDidMount() {
    this.search()
  }

  componentDidUpdate(prevProps) {
    const { pathname, query } = this.props.url

    // verify props have changed to avoid an infinite loop
    if (query.q !== prevProps.url.query.q) {
      // fetch data based on the new query
      this.search()
    }
  }
  
  async search() {
    const {
      url
    } = this.props
    const search = this.formatValue(url.query.q)
    const res = await fetch(`http://localhost:3000/api/search/${search}`)
    const data = await res.json()
    this.setState({searchResults: data.links || [], search})
  }

  formatValue = (value) => {
    if(!value) return ''
    const formatted = value.replace(/\s/g, '.').replace(/[.]+/gi, '.').replace(/[^0-9a-z.]/gi, '').slice(0, 4)
    return formatted
  }
  handleLinkChange = (value) => {
    const slug = this.formatValue(value)
    const href = slug ? `/?q=${slug}` : '/'
    const as = href
    Router.push(href, as, { shallow: true })
  }
  
  debouncedUpdate = debounced(300, value => this.handleLinkChange(value));

  render() {
    return (
      <div className="search-box">
        <style jsx>{`
          .search-box {
            max-width: 400px;
            margin: auto;
          }
          form {
            box-shadow: 5px 10px 25px rgba(0,0,0,0.04);
          }
        `}</style>
        <form method="post" onSubmit={this.handleLinkSubmit}>
          <input name="_csrf" type="hidden" value={this.props.session.csrfToken}/>
          <Input
            size="large"
            addonBefore="bubb.as/"
            value={this.state.search}
            placeholder="Your short url..."
            onChange={({ target: { value } }) => {this.setState({search: this.formatValue(value)}); return this.debouncedUpdate(value)}}
            defaultValue={this.state.search}
          />
        </form>
        <ShortLinkSelect
          searchResults={this.state.searchResults}
          search={this.state.search}
          session={this.props.session}
          onSelect={this.props.onSelect}
        />
      </div>
    )
  }
}