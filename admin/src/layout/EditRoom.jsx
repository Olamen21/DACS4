import { useState, useRef, useEffect } from 'react';
import '../App.css'
import Button from '../components/button';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';

const EditRoom = () => {
  const { room_id } = useParams();
  const location = useLocation();
  const { nameHotel } = location.state || {};
  const navigate = useNavigate();

  const [roomData, setRoomData] = useState('')
  const [number, setNumber] = useState('');
  const [hotel_id, setHotel_id] = useState('')
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [errorNumber, setNumberError] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [image, setImage] = useState(null)

  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlRoom = import.meta.env.VITE_API_URL_ROOM;

  const handleChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

  const handleBack = async (hotel_id) => {
    navigate(`/Room-management/${hotel_id}`, { state: { nameHotel } });
  }

  useEffect(() => {
    const fetchHotelData = async () => {
      const responsive = await axios.get(apiUrl + apiUrlRoom + room_id)
      setNumber(responsive.data.room_number)
      setPrice(responsive.data.price_per_night)
      setCapacity(responsive.data.capacity)
      setSelectedRoom(responsive.data.room_type)
      setImage(responsive.data.roomImages)
      setHotel_id(responsive.data.id_hotel)
    }
    fetchHotelData()
  }, [])

  const handleSubmit = async () => {
    try {
      if (number === "" || price === "" || capacity === "" || selectedRoom === "") {
        alert("Please fill in all the required information.")
        return
      }

      console.log(image)
      const formData = new FormData();
      formData.append('room_type', selectedRoom);
      formData.append('price_per_night', price);
      formData.append('capacity', capacity);
      formData.append('image', image);

      await axios.patch(apiUrl + apiUrlRoom + room_id, formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // Quan trọng
        },
    })
        .then((responsive) => {
          if (responsive.data) {
            alert("Update room successful.");
          }
        }).catch((error) => {
          console.log(error);
          alert("An error occurred during registration.");
      });

    } catch (error) {
      console.log(error)
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
        {image && (
          <img
            src={image}
            alt="Room"
            style={{ width: '150px', height: 'auto', marginBottom: '10px', marginLeft: '20px', borderRadius: '10%' }}
          />
        )}
      </div>
      <div className="button-hotel flex">
        <div className="button-hotel-back">
          <Button bgColor="black" colorText='white' text='Back' onClick={() => handleBack(hotel_id)} />
        </div>
        <Button text='Update' onClick={() => handleSubmit()} />
      </div>
    </div>
  )
}

export default EditRoom