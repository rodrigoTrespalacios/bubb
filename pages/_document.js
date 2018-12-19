import Document, { Head, Main, NextScript } from 'next/document'
import Page from '../components/Page'
import Footer from '../components/Footer'

export default class DefaultDocument extends Document {
  static async getInitialProps(props) {
    return await Document.getInitialProps(props)
  }

  render() {
    return (
      <html lang={this.props.__NEXT_DATA__.props.lang || 'en'}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <script src="https://js.stripe.com/v3/"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        <Footer />
      </html>
    )
  }
}