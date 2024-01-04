import { useState } from 'react';
import { Button, Textarea, Select, Label, TextInput } from 'flowbite-react';

const UploadBook = () => {
  const bookCategories = [
    'Fiction',
    'Non-Fiction',
    'Mistery',
    'Programming',
    'Science Fiction',
    'Fantasy',
    'Horror',
    'Bibliography',
    'Autobiography',
    'History',
    'Self-help',
    'Memoir',
    'Bussiness',
    'Children Books',
    'Travel',
    'Religion',
    'Art and Design',
  ];
  const [SelectedBookCategory, setSelectedBookCategory] = useState(
    bookCategories[0]
  );
  const handleChangeSelectedValue = (event) => {
    console.log(event.target.value);
    setSelectedBookCategory(event.target.value);
  };

  //handle book submission
  const handleBookSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageUrl = form.imageUrl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPdfUrl = form.bookPdfUrl.value;
    const bookPrice = form.bookPrice.value;

    const bookObj = {
      bookTitle,
      authorName,
      imageUrl,
      category,
      bookDescription,
      bookPdfUrl,
      price: bookPrice,
    };

    console.log(bookObj);

    //send data to db
    fetch('http://localhost:4000/upload-book', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(bookObj),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        alert('Book uploaded successfully!!');
        form.reset();
      });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>Upload A Book</h2>
      <form
        onSubmit={handleBookSubmit}
        className='flex lg:w-[1180px] flex-col flex-wrap gap-4'
      >
        {/* first row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='bookTitle' value='Book Title' />
            </div>
            <TextInput
              id='bookTitle'
              type='bookTitle'
              placeholder='Book name'
              requiredtype='text'
            />
          </div>
          {/* authorName     */}
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='authorName' value='Author Name' />
            </div>
            <TextInput
              id='authorName'
              type='authorName'
              placeholder='Author Name'
              requiredtype='text'
            />
          </div>
        </div>
        {/* second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='imageUrl' value='Book Image URL' />
            </div>
            <TextInput
              id='imageUrl'
              type='imageUrl'
              placeholder='Book Image URL'
              requiredtype='text'
            />
          </div>
          {/* authorName     */}
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label htmlFor='inputState' value='Book Category' />
            </div>
            <Select
              id='inputState'
              name='categoryName'
              className='w-full rounded'
              value={SelectedBookCategory}
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

        <div className='lg:w-1/2'>
          <div className='mb-2 block'>
            <Label htmlFor='bookDescription' value='Book Description ' />
          </div>
          <Textarea
            id='bookDescription'
            name='bookDescription'
            placeholder='Write your book description...'
            required
            className='w-full'
            rows={6}
          />
        </div>
        {/*book pdn link */}
        <div className='max-w-md'>
          <div className='mb-2 block'>
            <Label htmlFor='bookPdfUrl' value='Book PDF URL' />
          </div>
          <TextInput
            id='bookPdfUrl'
            type='bookPdfUrl'
            placeholder='book pdf url'
            requiredtype='text'
          />
        </div>
        {/*book price */}
        <div className='max-w-md'>
          <div className='mb-2 block'>
            <Label htmlFor='bookPrice' value='Book Price' />
          </div>
          <TextInput
            id='bookPrice'
            type='text'
            placeholder='book price'
            requiredtype='text'
          />
        </div>
        <Button type='submit' className='mt-5'>
          Upload Book
        </Button>
      </form>
    </div>
  );
};

export default UploadBook;
