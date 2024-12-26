import '../App.css'
import { useEffect, useState } from 'react';
import { FaBed , FaUser, FaClipboardList, FaHotel } from 'react-icons/fa';
import Button from '../components/button'
import axios from 'axios';

const Home = () => {
    const [userDataCount, setUserDataCount] = useState("")
    const [hotelDataCount, setHoteDataCount] = useState("")
    const [roomDataCount, setRoomDataCount] = useState("")
    const [bookingDataCount, setBookingDataCount] = useState('')

    const [dataBooking, setDataBooking] = useState([]);
    const [hotelNames, setHotelNames] = useState({});
    const [prices, setPrices] = useState({});
    const [usernames, setUsernames] = useState({});
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlUser = import.meta.env.VITE_API_URL_USER;
    const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;
    const apiUrlRoom = import.meta.env.VITE_API_URL_ROOM;
    const apiUrlBooking = import.meta.env.VITE_API_URL_BOOKING;


    const formatDate = (rawDate) => {
        let date = new Date(rawDate);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return `${day}-${month}-${year}`;
    }
    const handleDelete = async (booking_id) => {
        const result = window.confirm("Are you sure you want to delete this booking?");
        if (result) {
            try {
                const responsive = axios.delete(apiUrl + apiUrlBooking + booking_id)
                setBookingDataCount(responsive.data)
                console.log("delete")
            } catch (error) {
                console.log(error)
            }
            alert("Delete booking successfully.")
        } else {
            console.log("Người dùng đã chọn No");
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(apiUrl + apiUrlUser);
                const countUser = Array.isArray(res.data) ? res.data.length : 0;
                setUserDataCount(countUser)

                const response = await axios.get(apiUrl + apiUrlHotel)
                const countHotel = Array.isArray(response.data) ? response.data.length : 0;
                setHoteDataCount(countHotel)

                const responsiveRoom = await axios.get(apiUrl + apiUrlRoom)
                const countRoom = Array.isArray(responsiveRoom.data) ? responsiveRoom.data.length : 0;
                setRoomDataCount(countRoom)

                // Lấy dữ liệu Booking
                const responsive = await axios.get(apiUrl + apiUrlBooking);
                const bookings = responsive.data;
                setDataBooking(bookings);

                const countBooking = Array.isArray(bookings) ? bookings.length : 0;
                setBookingDataCount(countBooking);

                // Lấy danh sách id_user, id_hotel, id_room từ booking
                const userIds = [...new Set(bookings.map((booking) => booking.id_user))];
                const hotelIds = [...new Set(bookings.map((booking) => booking.id_hotel))];
                const roomIds = [...new Set(bookings.map((booking) => booking.id_room))];

                // Lấy tên người dùng
                const userFetchPromises = userIds.map((id_user) =>
                    axios.get(apiUrl + apiUrlUser + id_user).then((res) => ({
                        id_user,
                        username: res.data.username,
                    }))
                );
                const userResults = await Promise.all(userFetchPromises);
                const usernameMap = userResults.reduce((map, user) => {
                    map[user.id_user] = user.username;
                    return map;
                }, {});
                setUsernames(usernameMap);

                // Lấy tên khách sạn
                const hotelFetchPromises = hotelIds.map((id_hotel) =>
                    axios.get(apiUrl + apiUrlHotel + id_hotel).then((res) => ({
                        id_hotel,
                        nameHotel: res.data.nameHotel,
                    }))
                );
                const hotelResults = await Promise.all(hotelFetchPromises);
                const hotelNameMap = hotelResults.reduce((map, hotel) => {
                    map[hotel.id_hotel] = hotel.nameHotel;
                    return map;
                }, {});
                setHotelNames(hotelNameMap);

                // Lấy giá phòng
                const roomFetchPromises = roomIds.map((id_room) =>
                    axios.get(apiUrl + apiUrlRoom + id_room).then((res) => ({
                        id_room,
                        price_per_night: res.data.price_per_night,
                    }))
                );
                const roomResults = await Promise.all(roomFetchPromises);
                const priceMap = roomResults.reduce((map, room) => {
                    map[room.id_room] = room.price_per_night;
                    return map;
                }, {});
                setPrices(priceMap);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [handleDelete]);
    return (
        <div >
            <div className="home-title">Information</div>
            <div className="flex">
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#0000ff' }}>HOTEL</div>
                            <FaHotel className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>{hotelDataCount}</div>
                    </div>
                </div>
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#009933' }}>ROOM</div>
                            <FaBed  className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>{roomDataCount}</div>
                    </div>
                </div>
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#00cccc' }}>USERS</div>
                            <FaUser className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>{userDataCount}</div>
                    </div>
                </div>
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#e6e600' }}>BOOKED ROOM</div>
                            <FaClipboardList className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>{bookingDataCount}</div>
                    </div>
                </div>
            </div>
            <div className="home-title">Booking History</div>
            <div className="table-responsive m-b-40">
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>Booking date</th>
                            <th>Booking person</th>
                            <th>Hotel name</th>
                            <th >Price</th>
                            <th >Check-in</th>
                            <th >Check-out</th>
                            <th >Total cost</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBooking && dataBooking.length > 0 ? (
                            dataBooking.map((booking, index) => (
                                <tr key={booking.id}>
                                    <td>{formatDate(booking.createdAt)}</td>
                                    <td>{usernames[booking.id_user] || "Loading..."}</td>
                                    <td>{hotelNames[booking.id_hotel] || "Loading..."}</td>
                                    <td >{prices[booking.id_room] || "Loading..."}</td>
                                    <td>{formatDate(booking.check_in)}</td>
                                    <td>{formatDate(booking.check_out)}</td>
                                    <td>{booking.total_cost}</td>
                                    <td className=''>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <Button text="Delete" onClick={() => handleDelete(booking._id)} />
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

export default Home
