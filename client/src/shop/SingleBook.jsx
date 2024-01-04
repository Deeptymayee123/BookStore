import axios from "axios";
import { Button } from "flowbite-react";
import { useLayoutEffect } from "react";
import { useLoaderData } from "react-router-dom";

const SingleBook = () => {
  const {
    _id,
    authorName,
    bookTitle,
    category,
    imageUrl,
    price,
    bookDescription,
  } = useLoaderData();
  // const data = useLoaderData();

  // console.log(data);

  const CheckoutHandler = async ({ _id, name, amount }) => {
    try {
      const { data: order } = await axios.post(
        "http://localhost:4000/payment/checkout",
        {
          _id,
          name,
          amount,
        }
      );

      var options = {
        key: "rzp_test_IhNkeFHuQGPcEa", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: order.currency,
        name: bookTitle,
        description: "RAZORPAY PAYMENT",
        image: imageUrl,
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: "http://localhost:4000/payment/payment-verification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log(error.response);
    }
  };

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="mt-28 px-4 lg:px-24">
      <div className="md:flex gap-8">
        <div className="basis-3/12">
          <img
            src={imageUrl}
            alt=""
            className="rounded-md aspect-[3/4] min-w-[240px] w-full block"
          />
        </div>
        <div className="grow p-4">
          <h2 className="text-2xl font-bold">{bookTitle}</h2>
          <h4 className="text-xl mb-4 text-gray-700">{authorName}</h4>
          <p className="text-5xl mb-4">₹ {price}</p>

          {/* category */}
          <p className="my-2">
            <span className="font-bold">Category: </span> {category}
          </p>

          {/* description */}
          <p className="my-2">
            <span className="font-bold">Description: </span>{" "}
            <span dangerouslySetInnerHTML={{ __html: bookDescription }}></span>
          </p>

          <Button
            onClick={() =>
              CheckoutHandler({ _id, name: bookTitle, amount: price })
            }
            color="blue"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
