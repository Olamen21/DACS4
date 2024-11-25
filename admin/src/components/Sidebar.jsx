import { FaHome } from 'react-icons/fa';
import { FaUsers, FaHotel } from 'react-icons/fa';

import logo from '../assets/logo.png';
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className={'w-64 bg-custom-main fixed h-full px-4 py-2'}>
      <div className="my-2 mb-4">
        <img src={logo} alt="Logo" style={{ width: '190px', height: '160px' }} />
      </div>
      <hr />
      <ul className="mt-3 font-bold" style={{ color: '#606060' }}>
        <NavLink to="/" end>
          {({ isActive }) => (
            <li
              className={`mb-3 rounded py-3 px-3 ${isActive ? 'bg-custom-green text-white' : 'hover:bg-custom-green hover:text-white'}`}
            >
              <FaHome className="inline-block w-6 h-6 mr-2 -mt-2" />
              Home
            </li>
          )}
        </NavLink>

        <NavLink to="/Hotel-Management">
          {({ isActive }) => (
            <li
              className={`mb-3 rounded py-3 px-3 ${isActive ? 'bg-custom-green text-white' : 'hover:bg-custom-green hover:text-white'}`}
            >
              <FaHotel className="inline-block w-6 h-6 mr-2 -mt-2" />
              Hotel Management
            </li>
          )}
        </NavLink>

        <NavLink to="/user-management">
          {({ isActive }) => (
            <li
              className={`mb-3 rounded py-3 px-3 ${isActive ? 'bg-custom-green text-white' : 'hover:bg-custom-green hover:text-white'}`}
            >
              <FaUsers className="inline-block w-6 h-6 mr-2 -mt-2" />
              User Management
            </li>
          )}
        </NavLink>
      </ul>
    </div>
  );
};

export default Sidebar;
