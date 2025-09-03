   document.addEventListener('DOMContentLoaded', function() {
    fetch('https://stripe.vintageshirtclub.com/config')
      .then(r => r.json())
      .then(({ publishableKey }) => {
        console.log("ddddddddd")
        const stripe = Stripe(publishableKey);

        const paymentRequest = stripe.paymentRequest({
          country: 'US',
          currency: 'usd',
          total: {
            label: 'Demo Product',
            amount: 100,
          },
          requestPayerName: true,
          requestPayerEmail: true,
        });

        const elements = stripe.elements();
        paymentRequest.canMakePayment().then(result => {
          if (result) {
            const prButton = elements.create('paymentRequestButton', {
              paymentRequest: paymentRequest,
            });
            prButton.mount('#payment-request-button');
          } else {
            document.getElementById('payment-request-button').style.display = 'none';
          }
        });

        paymentRequest.on('paymentmethod', async (ev) => {
          const res = await fetch('https://stripe.vintageshirtclub.com/create-payment-intent', { method: 'POST' });
          const { clientSecret } = await res.json();

          const { error } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: ev.paymentMethod.id,
          }, { handleActions: false });

          if (error) {
            ev.complete('fail');
          } else {
            ev.complete('success');
          }
        });
      });
        });