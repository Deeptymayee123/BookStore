// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
//react icons
import { FaStar } from 'react-icons/fa6';
import { Avatar } from 'flowbite-react';
import profilePic from '../assets/profile.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

//import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const reviews = [
  {
    name: 'John Doe',
    imgURL: profilePic,
    company: 'Google Inc',
    reviewText: '',
  },
  {
    name: 'John Doe',
    imgURL: profilePic,
    company: 'Google Inc',
    reviewText: '',
  },
  {
    name: 'John Doe',
    imgURL: profilePic,
    company: 'Google Inc',
    reviewText: '',
  },
  {
    name: 'John Doe',
    imgURL: profilePic,
    company: 'Google Inc',
    reviewText: '',
  },
  {
    name: 'John Doe',
    imgURL: profilePic,
    company: 'Google Inc',
    reviewText: '',
  },
];

const Review = () => {
  return (
    <div className='my-12 px-4 lg:px-24'>
      <h2 className='text-5xl font-bold text-center mb-10 leading-snug'>
        Our Customers
      </h2>
      <div>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          modules={[Pagination]}
          className='mySwiper'
        >
          {reviews.map((r, i) => (
            <SwiperSlide
              key={i}
              className='shadow-2xl bg-white py-8 px-4 md:m-5 rounded-lg border'
            >
              <div className='space-y-6'>
                <div className='text-amber-500 flex gap-2'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>

                {/*text*/}
                <p className='mb-5'>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industries
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <Avatar
                  img={r.imgURL}
                  alt='avatar of Jese'
                  rounded
                  className='w-10 mb-4'
                />
                <h5 className='text-lg font-medium'>{r.name}</h5>
                <p className='text-base'>{r.company}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Review;
