import '../App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '../components/button';


const UserManagement = () => {
    const [userData, setUseData] = useState("")
    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlUser = import.meta.env.VITE_API_URL_USER;
    const handleClick = (user_id) => {
        const result = window.confirm("Are you sure you want to delete this user?");
        if (result) {
            try {
                const responsive = axios.delete(apiUrl+apiUrlUser+user_id)
                setUseData(responsive.data)
                console.log("delete")
            } catch (error) {
                console.log(error)
            }
          alert("Delete user successfully.")
        } else {
          // Người dùng chọn No (Cancel)
          console.log("Người dùng đã chọn No");
        }
      };
    useEffect(() => {
        console.log("hello")
        const fetchUserData = async () => {
            try {
                const res = await axios.get(apiUrl + apiUrlUser);
                setUseData(res.data)
                console.log(res.data)
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    },[handleClick]);

    const formatDate = (rawDate) => {
        let date = new Date(rawDate);
    
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
    
        return `${day}-${month}-${year}`;
    
      }
      
    return (
        <div>

            <div className="home-title">List of account</div>
            <div className="table-responsive m-b-40">
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Gender</th>
                            <th>Address</th>
                            <th>Day of birth</th>
                            <th>Phone number</th>
                            <th>Created at</th>
                            <th>   </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userData && userData.length > 0 ? (
                            userData.map((user, index) => (
                                <tr key={user.id}> {/* Assuming each user has a unique id */}
                                    <td>{index + 1}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.address}</td>
                                    <td>{formatDate(user.dob)}</td> {/* Assuming the date of birth field is 'dob' */}
                                    <td>{user.phoneNumber}</td>
                                    <td>{formatDate(user.created_at)}</td> {/* Assuming createdAt is the creation date */}
                                    <td> <Button text="Delete" onClick={()=>handleClick(user._id)} /></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9">No users found</td>
                            </tr>
                        )}
                    </tbody>

                    <tbody>

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default UserManagement
