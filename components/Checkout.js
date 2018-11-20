import React from 'react';
import {render} from 'react-dom';
import {StripeProvider, Elements} from 'react-stripe-elements';

import InjectedCheckoutForm from './CheckoutForm';

export default class extends React.Component {

  constructor() {
    super();
    this.state = {stripe: null};
  }
  componentDidMount() {
    // Create Stripe instance in componentDidMount
    // (componentDidMount only fires in browser/DOM environment)
    this.setState({stripe: window.Stripe('pk_test_cqx3QYah504nGgNSRVAtsVfw')});
  }

  render () {
    return (
      <StripeProvider stripe={this.state.stripe}>
        <Elements>
          <InjectedCheckoutForm session={this.props.session}/>
        </Elements>
      </StripeProvider>
    )
  }
}