
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import '@fortawesome/fontawesome-free/css/all.min.css';

import './App.css'
// Các trang
import Home from './layout/home';

import UserManagement from './layout/userManagement';
import AddRoom from './layout/AddRoom';
import HotelManagement from './layout/HotelManagement';
import AddHotel from './layout/AddHotel';
import RoomManagement from './layout/RoomManagement';
import EditRoom from './layout/EditRoom';
import EditHotel from './layout/EditHotel';


function App() {
  return (
    <Router>
      <div className="app-layout">
        <div className='flex'>
          <Sidebar />
          <Dashboard  />
        </div>
        <div className="main-content ">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Hotel-management" element={<HotelManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/add-room/:hotel_id" element={<AddRoom/>}/>
            <Route path="/add-Hotel" element={<AddHotel/>} />
            <Route path='/Room-management/:hotel_id' element={<RoomManagement />} />
            <Route path='/edit-room/:room_id' element={<EditRoom/>}/>
            <Route path='/edit-hotel/:hotel_id' element={<EditHotel/>}/>
          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
