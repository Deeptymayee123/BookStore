import React from "react";
import { useState, useEffect } from "react";
import BooksCard from "../Components/BooksCard";

const OtherBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/all-books")
      .then((res) => res.json())
      .then((data) => setBooks(data.slice(0, 10)));
  }, []);
  return (
    <div>
      <BooksCard books={books} headLines="Other Books" />
    </div>
  );
};

export default OtherBooks;
