import { useState} from 'react';
import '../App.css'
import Button from '../components/button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const AddRoom = () => {
  const { hotel_id } = useParams();
  const location = useLocation();
  const { nameHotel } = location.state || {};
  const navigate = useNavigate();

  const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;
  const [roomDataCount, setRoomDataCount] = useState("")

  const [number, setNumber] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errorNumber, setNumberError] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [image, setImage] = useState(null)

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlRoom = import.meta.env.VITE_API_URL_ROOM;

  const handleChange = (e) => {
    setSelectedRoom(e.target.value);
  };


  const handleBack = async () => {
    navigate(`/Room-management/${hotel_id}`, { state: { nameHotel } });
  }


  const handleSubmit = async () => {

    try {
      if (number === "" || price === "" || capacity === "" || selectedRoom === "") {
        alert("Please fill in all the required information.")
        return
      }

      const responsive = await axios.get(apiUrl + apiUrlRoom)
      const numberExists = responsive.data.some(room => room.room_number === number);
      if (numberExists) {
        setNumberError("This room number is already taken. Please use a different room number.");
        return;
      }
      if (!image) {
        alert('Please upload an image.');
        return;
      }
      console.log(image)
      const formData = new FormData();
      formData.append('id_hotel', hotel_id);
      formData.append('room_number', number);
      formData.append('room_type', selectedRoom);
      formData.append('price_per_night', price + "$");
      formData.append('capacity', capacity);
      formData.append('image', image);

      const response = await axios.post(apiUrl + apiUrlRoom, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Quan trọng
        },
      });

      if (response.data) {
        alert("Add room successful.");
      }
      const res = await axios.get(apiUrl + apiUrlRoom + "search/"  + hotel_id);
      const countRoom = Array.isArray(res.data) ? res.data.length : 0;
      setRoomDataCount(countRoom)
      let dataHotel = {
        total_rooms: countRoom,
      }
      await axios.patch(apiUrl + apiUrlHotel + hotel_id, dataHotel)
      setNumber("")
      setPrice("")
      setCapacity("")
      setImage(null);

    } catch (error) {
      console.error("Error submitting hotel:", error.response?.data || error.message);
      alert("An error occurred during registration.");
    }
  }
  return (
    <div>
      <div className="home-title">Add room</div>
      <div className='flex'>
        <div className='add-box-room'>
          <div className='Number-Room'>Number of room</div>
          <input
            className="Number-Room-Input"
            type="text"
            value={number}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              setNumber(e.target.value);
              setNumberError("")
            }}
          />
          {errorNumber ? <div className="errorStyle">{errorNumber}</div> : null}
        </div>
        <div className='add-box-room'>
          <div className='Number-Room'>Price per Night</div>
          <input
            className="Number-Room-Input"
            type="text"
            value={price}
            onInput={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, '');
              setPrice(e.target.value);
            }}
          />
        </div>

        <div className='add-box-room'>
          <div className='Number-Room'>Capacity of room</div>
          <input
            className="Number-Room-Input"
            type="text"
            value={capacity}
            onInput={(e) => {
              const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
              const numericValue = Math.min(10, parseInt(value) || 0); // If value is more than 10, set to 10
              setCapacity(numericValue.toString());
            }}
          />
        </div>
        <div className='add-box-room'>
          <label className='Number-Room'>Type of room: </label>
          <select
            id="roomType"
            value={selectedRoom}
            onChange={handleChange}
            className="select-room"
          >
            <option value="Single">Single Room</option>
            <option value="Double">Double Room</option>
            <option value="Suite">Suite Room</option>
          </select>
        </div>
      </div>
      <div className='row-box flex'>
        <div className='Number-Room'>Images of room</div>
        <input
          className='Number-Room-img'
          type="file"
          accept="image/*"
          name="image"
          onChange={handleImageChange}
        />
      </div>
      <div className="button-hotel flex">
        <div className="button-hotel-back">
          <Button bgColor="black" colorText='white' text='Back' onClick={() => handleBack()} />
        </div>
        <Button text='Submit' onClick={() => handleSubmit()} />
      </div>
    </div>
  )
}

export default AddRoom