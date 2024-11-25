import { useParams } from 'react-router-dom';
import Button from '../components/button';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';


const RoomManagement = () => {
  const { hotel_id } = useParams();
  const location = useLocation();
  const { nameHotel } = location.state || {};
  const navigate = useNavigate();
  const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;
  const [roomDataCount, setRoomDataCount] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlRoom = import.meta.env.VITE_API_URL_ROOM;

  const [roomData, setRoomData] = useState('')
  const handleAdd = async () => {
    navigate(`/add-room/${hotel_id}`, { state: { nameHotel } })
  }
  const handleBack = async () => {
    navigate('/Hotel-management');
  }
  const handleEdit = async (room_id) => {
    navigate(`/edit-room/${room_id}`,{ state: { nameHotel } });
  }
  const handleDelete = async (room_id) => {
    const result = window.confirm("Are you sure you want to delete this room?");
    if (result) {
      try {
        const responsive = axios.delete(apiUrl + apiUrlRoom + room_id)
        setRoomData(responsive.data)
        console.log("delete")

        const res = await axios.get(apiUrl + apiUrlRoom + "search/"  + hotel_id);
        const countRoom = Array.isArray(res.data) ? res.data.length : 0;
        setRoomDataCount(countRoom)
        let dataHotel ={
          total_rooms: countRoom,
        }
        await axios.patch(apiUrl + apiUrlHotel + hotel_id,dataHotel)
      } catch (error) {
        console.log(error)
      }
      alert("Delete room successfully.")
    } else {
      console.log("Người dùng đã chọn No");
    }
  }
  const handleDetail = async (hotel_id, nameHotel) => {
    navigate(`/Room-management/${hotel_id}`, { state: { nameHotel } });
  }

  useEffect(() => {
    try {
      const fetchHotelData = async () => {
        const responsive = await axios.get(apiUrl + apiUrlRoom + "search/"  + hotel_id);
        console.log(apiUrl + apiUrlRoom + "search/"  + hotel_id)
        setRoomData(responsive.data)
      }
      fetchHotelData()
    } catch (error) {
      console.log(error)
    }
  }, [handleDelete])

  return (
    <div>
      <div className='flex'>
        <div className="room-title">List of room in {nameHotel}</div>

        <div className='room-back'>
          <Button text='Back' bgColor="black" colorText='white' onClick={() => handleBack()} />
        </div>

        <div className='room-add'>
          <Button text='Add room' onClick={() => handleAdd()} />
        </div>

      </div>

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
            <tr>
              <th>#</th>
              <th>Number</th>
              <th>Type</th>
              <th>Price per Night</th>
              <th>Capacity</th>
              <th>Availability</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roomData && roomData.length > 0 ? (
              roomData.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.room_number}</td>
                  <td>{room.room_type}</td>
                  <td>{room.price_per_night}</td>
                  <td>{room.capacity}</td>
                  <td>
                    {room.availability ? (
                      <i className="fas fa-check" style={{ color: 'green', fontSize: '24px' }}></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: 'red', fontSize: '24px' }}></i>
                    )}
                  </td>
                  <td className=''>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Button text="Edit" onClick={() => handleEdit(room._id)} />
                      <Button text="Delete" onClick={() => handleDelete(room._id)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No rooms found</td>
              </tr>
            )}



          </tbody>
        </table>

      </div>
    </div>
  );
};

export default RoomManagement;
