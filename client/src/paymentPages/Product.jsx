import Card from "../Components/Card";
import ProductData from "../api/product.json";
const Product = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -mx-4 -my-8">
          {ProductData.map((c, i) => {
            return (
              <Card key={i} image={c.image} title={c.title} price={c.price} />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Product;
