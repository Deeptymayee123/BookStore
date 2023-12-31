import { useSearchParams } from "react-router-dom";

const Success = () => {
  const [query] = useSearchParams();
  console.log(query.get("payment_id"));
  return (
    <div className="text-center min-h-screen flex justify-center items-center text-2xl font-bold">
      <div>
        Congratulation
        <br />
        Your payment Id is :{query && query.get("payment_id")}
      </div>
    </div>
  );
};

export default Success;
