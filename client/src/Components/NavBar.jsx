import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';

//react icons
import { FaBarsStaggered, FaBlog, FaXmark } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthProvider';

const navItems = [
  { link: 'Home', path: '/' },
  { link: 'About', path: '/about' },
  { link: 'shop', path: '/shop' },
  { link: 'sell your Book', path: '/admin/dashboard' },
  { link: 'Blog', path: '/blog' },
];

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const { user, loading, logOut } = useContext(AuthContext);
  console.log(user);

  //toggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.addEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
      <nav
        className={`py-4 lg:px-24 px-4 ${
          isSticky ? 'sticky top-0 left-0 right-0 bg-blue-300' : ''
        }`}
      >
        <div className='flex justify-between items-center text-base gap-8'>
          {/* logo*/}
          <Link
            to='/'
            className='text-2xl font-bold text-blue-700 flex items-center'
          >
            <FaBlog className='inline-block' />
            Books
          </Link>
          {/* nav item for large device*/}
          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({ link, path }) => (
              <Link key={path} to={path} className='block text-base text-black'>
                {link}
              </Link>
            ))}
          </ul>
          <div className='hidden lg:flex gap-2 items-center'>
            {user ? (
              <>
                <button
                  onClick={() => logOut()}
                  className='bg-blue-600 border border-blue-600 p-2 px-4 rounded-md text-white'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='bg-blue-600 border border-blue-600 p-2 px-4 rounded-md text-white'
                >
                  Login
                </Link>
                <Link
                  to='/sign-up'
                  className='bg-white border border-blue-600 p-2 px-4 rounded-md text-blue-600'
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* mobile menu */}
          <div className='visible md:hidden'>
            <button
              onClick={toggleMenu}
              className='text-black focus:outline-none'
            >
              {isMenuOpen ? (
                <FaXmark className='h-5 w-5 text-black' />
              ) : (
                <FaBarsStaggered className='h-5 w-5 text-black' />
              )}
            </button>
          </div>
        </div>

        {/* navbar for small devices */}
        <div
          className={`space-y-4 px-4 mt-12 py-7 bg-blue-700 ${
            isMenuOpen ? 'block fixed top-0 right-0 left-0' : 'hidden'
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              key={path}
              to={path}
              className='block text-base text-white uppercase cursor-pointer '
            >
              {link}
            </Link>
          ))}

          <div className='flex gap-2 items-center'>
            {user ? (
              <>
                <button
                  onClick={() => logOut()}
                  className='bg-blue-600 border border-blue-600 p-2 px-4 rounded-md text-white'
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to='/login'
                  className='bg-blue-600 border border-blue-600 p-2 px-4 rounded-md text-white'
                >
                  Login
                </Link>
                <Link
                  to='/sign-up'
                  className='bg-white border border-blue-600 p-2 px-4 rounded-md text-blue-600'
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
