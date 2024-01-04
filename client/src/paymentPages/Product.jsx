import Card from '../Components/Card';
import ProductData from '../api/product.json';
import axios from 'axios';
const Product = () => {
  const CheckoutHandler = async ({ _id, name, amount }) => {
    const {
      data: { order },
    } = await axios.post('http://localhost:4000/payment/checkout', {
      _id,
      name,
      amount,
    });

    var options = {
      key: 'rzp_test_xZgvhQhDPAIcFr', // Enter the Key ID generated from the Dashboard
      amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: order.currency,
      name: 'Acme Corp',
      description: 'Test Transaction',
      image:
        'https://cdn.iconscout.com/icon/free/png-256/free-react-1-282599.png?f=webp',
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      callback_url: 'http://localhost:4000/payment/payment-verification',
      prefill: {
        name: 'Gaurav Kumar',
        email: 'gaurav.kumar@example.com',
        contact: '9000090000',
      },
      notes: {
        address: 'Razorpay Corporate Office',
      },
      theme: {
        color: '#3399cc',
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-wrap -mx-4 -my-8'>
          {ProductData.map((c, i) => {
            return (
              <Card
                key={i}
                image={c.image}
                title={c.title}
                price={c.price}
                onCheckout={CheckoutHandler}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;
