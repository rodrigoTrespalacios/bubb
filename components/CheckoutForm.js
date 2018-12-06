// CheckoutForm.js
import React from 'react';
import {injectStripe, CardElement} from 'react-stripe-elements';
import fetch from 'isomorphic-unfetch'
import Input from 'antd/lib/input'

class CheckoutForm extends React.Component {
  state = {
    cardholderName: ''
  }

  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    this.props.stripe.createToken({type: 'card', name: this.state.cardholderName}).then((res) => {
      console.log(res)      
      const data = {
        amount: 500,
        currency: 'usd',
        source: res.token.id,
      }
      console.log(data)
      fetch('http://localhost:3000/api/pay', {
        method: 'post',
        headers: {
          'x-csrf-token': this.props.session.csrfToken,
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then((res) => {
        res.status === 200 ? this.setState({ submitted: true }) : ''
      })

    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <CardElement className="stripe-card-input" style={{base: {'::placeholder': {
            color: '#bfbfbf',
            fontSize: 14,
        }}}}/>
        <Input
          placeholder="Cardholder name"
          onChange={(event) => this.setState({cardholderName: event.target.value})}
        />
        <button>Confirm order</button>
      </form>
    );
  }
}

export default injectStripe(CheckoutForm);