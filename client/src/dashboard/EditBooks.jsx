import { useLoaderData, useParams } from "react-router-dom";
import { Button, Textarea, Select, Label, TextInput } from "flowbite-react";
import { useState } from "react";

const EditBooks = () => {
  const { id } = useParams();
  const {
    bookTitle,
    authorName,
    imageUrl,
    category,
    bookDescription,
    bookPdfUrl,
    price,
    currency,
    rating,
  } = useLoaderData();

  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
    "Fantasy",
    "Horror",
    "Bibliography",
    "Autobiography",
    "History",
    "Self-help",
    "Memoir",
    "Bussiness",
    "Children Books",
    "Travel",
    "Religion",
    "Art and Design",
  ];
  const [SelectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );
  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  //handle book submission
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;
    const price = form.price.value;
    const currency = form.currency.value;
    const rating = form.rating.value;

    const updateBookObj = {
      bookTitle,
      authorName,
      imageUrl,
      category,
      bookDescription,
      bookPdfUrl,
      price,
      currency,
      rating,
    };
    //console.log(bookObj);
    //update book data
    fetch(`http://localhost:4000/book/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateBookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Book is updated successfully!!");
      });
  };

  return (
    <div className="px-4 my-12">
      <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>
      <form
        onSubmit={handleUpdate}
        className="flex lg:w-[1180px] flex-col flex-wrap gap-4"
      >
        {/* first row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="bookTitle" value="Book Title" />
            </div>
            <TextInput
              id="bookTitle"
              type="bookTitle"
              placeholder="Book name"
              requiredtype="text"
              defaultValue={bookTitle}
            />
          </div>
          {/* authorName     */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="authorName" value="Author Name" />
            </div>
            <TextInput
              id="authorName"
              type="authorName"
              placeholder="Author Name"
              requiredtype="text"
              defaultValue={authorName}
            />
          </div>
        </div>
        {/* second row */}
        <div className="flex gap-8">
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="imageUrl" value="Book Image URL" />
            </div>
            <TextInput
              id="imageUrl"
              type="imageUrl"
              placeholder="Book Image URL"
              requiredtype="text"
              defaultValue={imageUrl}
            />
          </div>
          {/* Category   */}
          <div className="lg:w-1/2">
            <div className="mb-2 block">
              <Label htmlFor="inputState" value="Book Category" />
            </div>
            <Select
              id="inputState"
              name="categoryName"
              className="w-full rounded"
              value={setSelectedBookCategory}
              onChange={handleChangeSelectedValue}
            >
              {bookCategories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/*bookDescription*/}

        <div className="lg:w-1/2">
          <div className="mb-2 block">
            <Label htmlFor="bookDescription" value="Book Description " />
          </div>
          <Textarea
            id="bookDescription"
            name="bookDescription"
            placeholder="Write your book description..."
            required
            className="w-full"
            rows={6}
            defaultValue={bookDescription}
          />
        </div>
        {/*book pdn link */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="bookPdfUrl" value="Book PDF URL" />
          </div>
          <TextInput
            id="bookPdfUrl"
            type="bookPdfUrl"
            placeholder="book pdf url"
            requiredtype="text"
            defaultValue={bookPdfUrl}
          />
        </div>
        {/*price */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            type="price"
            placeholder="Price"
            requiredtype="number"
            defaultValue={price}
          />
        </div>
        {/*currency */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="currency" value="Currency" />
          </div>
          <TextInput
            id="currency"
            type="currency"
            placeholder="Currency"
            requiredtype="text"
            defaultValue={currency}
          />
        </div>
        {/*rating */}
        <div className="max-w-md">
          <div className="mb-2 block">
            <Label htmlFor="rating" value="Rating" />
          </div>
          <TextInput
            id="rating"
            type="rating"
            placeholder="Rating"
            requiredtype="number"
            defaultValue={rating}
          />
        </div>
        <Button type="submit" className="mt-5">
          Update Book
        </Button>
      </form>
    </div>
  );
};

export default EditBooks;
