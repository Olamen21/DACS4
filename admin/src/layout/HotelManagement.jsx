import { useNavigate } from 'react-router-dom'
import '../App.css'
import Button from '../components/button'
import axios from 'axios'
import { useEffect, useState } from 'react'

const HotelManagement = () => {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;
 

  const [hotelData, setHoteData] = useState("")

  const handleAdd = async () => {
    navigate('/add-Hotel');
  }
  const handleEdit = async (hotel_id) => {
    navigate(`/edit-Hotel/${hotel_id}`);
  }
  const handleDelete = async (hotel_id) => {
    const result = window.confirm("Are you sure you want to delete this hotel?");
    if (result) {
      try {
        const responsive = axios.delete(apiUrl + apiUrlHotel + hotel_id)
        setHoteData(responsive.data)
        console.log("delete")
      } catch (error) {
        console.log(error)
      }
      alert("Delete hotel successfully.")
    } else {
      console.log("Người dùng đã chọn No");
    }
  }
  const handleDetail = async (hotel_id, nameHotel) => {
    navigate(`/Room-management/${hotel_id}`, { state: { nameHotel } });
};


  useEffect(() => {
    try {
      const fetchHotelData = async () => {
        const responsive = await axios.get(apiUrl + apiUrlHotel)
        setHoteData(responsive.data)

       

      }
      fetchHotelData()
    } catch (error) {
      console.log(error)
    }
  }, [handleDelete])
  return (
    <div>
      <div className='flex'>
        <div className="home-title">List of hotels</div>
        <div className='room-add'>
          <Button text='Add Hotel' onClick={() => handleAdd()} />
        </div>

      </div>

      <div className="table-responsive m-b-40">
        <table className="table table-borderless table-data3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Contact number</th>
              <th>Total rooms</th>
              <th>Booked rooms</th>
              <th>Available rooms</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {hotelData && hotelData.length > 0 ? (
              hotelData.map((hotel, index) => (
                <tr key={hotel.id}>
                  <td>{index + 1}</td>
                  <td>{hotel.nameHotel}</td>
                  <td>{hotel.address}</td>
                  <td>{hotel.contactNumber}</td>
                  <td>{hotel.total_rooms}</td>
                  <td>{hotel.available_rooms}</td>
                  <td>
          <img src={hotel.imageUrl} alt={hotel.name} style={{ width: '100px', height: 'auto' }} />
        </td>
                  <td>
                    <Button text="Details" onClick={() => handleDetail(hotel._id, hotel.nameHotel)} />
                  </td>
                  <td className=''>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <Button text="Edit" onClick={() => handleEdit(hotel._id)} />
                      <Button text="Delete" onClick={() => handleDelete(hotel._id)} />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No hotels found</td>
              </tr>
            )}



          </tbody>
        </table>

      </div>
    </div>
  )
}

export default HotelManagement
