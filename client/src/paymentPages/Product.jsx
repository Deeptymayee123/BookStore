import React from "react";
import Card from "../Components/Card";

const Product = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {Array(5)
            .fill(null)
            .map((C, i) => {
              return <Card key={i} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default Product;
