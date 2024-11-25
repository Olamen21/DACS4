import { useState } from 'react';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(prevState => !prevState);
    };

    return (
        <nav className='bg-custom-main px-4 py-4 flex justify-between ml-64'>
            <div className='flex items-center text-xl gap-x-20'>
                <div className='relative md:w-65'>
                    <input type='text' className='w-full h-[40px] px-4 py-1 pl-12 pr-12 rounded shadow outline-none hidden md:block' />
                    <span className='relative md:absolute inset-y-0 right-0 flex items-center pr-2 '>
                        <button className='p-1 focus:outline-none text-white  md:text-black'>
                            <FaSearch className='items-center' />
                        </button>
                    </span>
                </div>

            </div>

            <div className='flex items-center gap-x-5'>
                <div className='relative'>
                    <button className='text-gray flex' onClick={toggleDropdown}>
                        <FaUserCircle className='w-8 h-8 mt-1' />
                        <div className='ml-2 mt-2 mr-3 font-13'> Admin</div>
                    </button>
                    {isDropdownOpen && (
                        <div className='absolute bg-white rounded-lg shadow w-32 right-0 mt-2 p-2 pl-3 pr-3'>
                            <ul className='py-2 text-sm text-gray-950'>
                                <li><a href=''>Logout</a></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </nav>

    );
};

export default Navbar;
