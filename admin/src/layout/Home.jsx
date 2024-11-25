import '../App.css'
import { useEffect, useState } from 'react';
import { FaHome, FaDollarSign, FaUser, FaClipboardList } from 'react-icons/fa';
import axios from 'axios';

const Home = () => {
    const [userDataCount, setUserDataCount] = useState("")
    const [hotelDataCount, setHoteDataCount] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlUser = import.meta.env.VITE_API_URL_USER;
    const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;

   
    useEffect(()=>{
        console.log(apiUrl+apiUrlUser)
        const fetchUserData = async () => {
            try {
                const res = await axios.get(apiUrl + apiUrlUser);
                const countUser = Array.isArray(res.data) ? res.data.length : 0;
                setUserDataCount(countUser)

                const response = await axios.get(apiUrl + apiUrlHotel)
                const countHotel = Array.isArray(response.data) ? response.data.length : 0;
                setHoteDataCount(countHotel)
            } catch (error) {
                console.log(error)
            }
        };

        fetchUserData();
        
    },[])

    return (
        <div >
            <div className="home-title">Information</div>
            <div className="flex">
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#0000ff' }}>HOTEL</div>
                            <FaHome className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>{hotelDataCount}</div>
                    </div>
                </div>
                <div className='home-container'>
                    <div className=" card border-left-primary shadow h-100 py-2 ">
                        <div className='flex'>
                            <div className='home-box-title' style={{ color: '#009933' }}>INCOME</div>
                            <FaDollarSign className='home-box-icon' />
                        </div>
                        <div className='home-box-number'>2</div>
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
                        <div className='home-box-number'>2</div>
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
                            <th className="text-right">Price</th>
                            <th className="text-right">Check-in</th>
                            <th className="text-right">Check-out</th>
                            <th className="text-right">Total cost</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default Home
