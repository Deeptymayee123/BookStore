import { useEffect, useState } from "react";
import BooksCard from "../Components/BooksCard";

const BestSellerBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 11)));
  }, []);
  return (
    <div>
      <BooksCard books={books} headLines="Best seller books" />
    </div>
  );
};

export default BestSellerBooks;
