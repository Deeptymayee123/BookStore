import BannerCard from "../home/BannerCard";

const Banner = () => {
  return (
    <div className="px-4 lg:px-24 bg-teal-100 flex items-center">
      <div className="flex flex-col md:flex-row justify-between items-center gao-12 py-40">
        {/*left side*/}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-5xl font-bold leading-snug text-black ">
            Buy and sell your Books
            <span className="text-blue-700">for the Best Prices</span>
          </h2>
          <p className="md:w-4/5">lorem hff ftyf tydytd tyd </p>
        </div>
        <div>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="search a book"
            className="py-2 px-2 rounded-s-sm outline: none"
          ></input>
          <button className="bg-blue-700 px-6 py-2 text-white font-medium hover:bg-black position-all ease-in duration-200">
            search
          </button>
        </div>
        {/*right side*/}
        <div>
          <BannerCard></BannerCard>
        </div>
      </div>
    </div>
  );
};

export default Banner;