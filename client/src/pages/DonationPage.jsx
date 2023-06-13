import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CheckIcon } from '@heroicons/react/20/solid'
const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';


const ProductDisplay = () => {
  const [price, setPrice] = useState(0);

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  function handleStripe(e) {
    e.preventDefault();
    setPrice(20);
    getCheckout({variables: {amount: price}})
  }

  const includedFeatures = [
    'Private forum access',
    'Member resources',
    'Entry to annual conference',
    'Official member t-shirt',
  ]

  // useEffect(() => {
  //   const query = new URLSearchParams(window.location.search);
  //   stripePromise.then((res) => {
  //     if(!res._controller) return
  //     res.redirectToCheckout({ sessionId: query.get('session_id') });
  //   });
  // }, [price])


  // We check to see if there is a data object that exists, if so this means that a checkout session was returned from the backend
  // Then we should redirect to the checkout with a reference to our session id
  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

    return (
      <section>
        <div className="bg-white py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Subscribe</h2>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">Lifetime membership</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {includedFeatures.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">$99</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                    <a
                      href="#"
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get access
                    </a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Invoices and receipts available for easy company reimbursement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="product">
          <div className="description">
            <h3>Donate with us?</h3>
            <h5></h5>
          </div>
        </div>
        <form onSubmit={e => handleStripe(e)} method="POST">
          {/* Add a hidden field with the lookup_key of your Price */}
          <input type="hidden" name="lookup_key" value="{{PRICE_LOOKUP_KEY}}" />
          <button id="checkout-and-portal-button" type="submit">
            Checkout
          </button>
        </form>
      </section>
    )
  };

  const SuccessDisplay = ({ sessionId }) => {
    return (
      <section>
        <div className="product Box-root">
          <Logo />
          <div className="description Box-root">
            <h3>Subscription to starter plan successful!</h3>
          </div>
        </div>
        <form action="/create-portal-session" method="POST">
          <input
            type="hidden"
            id="session-id"
            name="session_id"
            value={sessionId}
          />
          <button id="checkout-and-portal-button" type="submit">
            Manage your billing information
          </button>
        </form>
      </section>
    );
  };

  const Message = ({ message }) => (
    <section>
      <p>{message}</p>
    </section>
  );

  export default function App() {
    let [message, setMessage] = useState('');
    let [success, setSuccess] = useState(false);
    let [sessionId, setSessionId] = useState('');


    useEffect(() => {
      // Check to see if this is a redirect back from Checkout
      const query = new URLSearchParams(window.location.search);

      if (query.get('success')) {
        setSuccess(true);
        setSessionId(query.get('session_id'));
      }

      if (query.get('canceled')) {
        setSuccess(false);
        setMessage(
          "Order canceled -- continue to shop around and checkout when you're ready."
        );
      }
    }, [sessionId]);

    if (!success && message === '') {
      return <ProductDisplay />;
    } else if (success && sessionId !== '') {
      return <SuccessDisplay sessionId={sessionId} />;
    } else {
      return <Message message={message} />;
    }
  }

  const Logo = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="14px"
      height="16px"
      viewBox="0 0 14 16"
      version="1.1"
    >
      <defs />
      <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g
          id="0-Default"
          transform="translate(-121.000000, -40.000000)"
          fill="#E184DF"
        >
          <path
            d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
            id="Pilcrow"
          />
        </g>
      </g>
    </svg>
  );