import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'
import Button from "../components/button";
import axios from "axios";
import { useParams } from 'react-router-dom';

const EditHotel = () => {
    const { hotel_id } = useParams();
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;

    const [nameHotel, setNameHotel] = useState("")
    const [address, setAddress] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")
    const apiUrlCity = import.meta.env.VITE_API_URL_CITY;
    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorPhone, setPhoneError] = useState("")
    const [ setHotelData] = useState("")
    const [selectedCity, setSelectedCity] = useState('');
    const [dataCity, setDataCity] = useState('')

    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
    };
    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^\d{10}$/;
        return regex.test(phoneNumber);
    };

    const handleChange = (event) => {
        setDescription(event.target.value);
    };
    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setSelectedAmenities((prev) =>
            prev.includes(value)
                ? prev.filter((item) => item !== value)
                : [...prev, value]
        );
    };
    useEffect(() => {
        try {
            const fetchHotelData = async () => {
                const responsive = await axios.get(apiUrl + apiUrlCity);
                setDataCity(responsive.data)
            }
            fetchHotelData()
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleBack = async () => {
        navigate('/Hotel-management');
    }

    useEffect(() => {
        const fetchHotelData = async () => {
            try {

                const response = await axios.get(apiUrl + apiUrlHotel + hotel_id);

                if (response.data) {
                    setHotelData(response.data);
                    setNameHotel(response.data.nameHotel);
                    setAddress(response.data.address);
                    setContactNumber(response.data.contactNumber);
                    setEmail(response.data.email);
                    setDescription(response.data.description);
                    setSelectedCity(response.data.id_city)
                    setImage(response.data.imageUrl)
                    console.log(response.data.email);

                    console.log(response.data.amenities);

                    const amenitiesString = response.data.amenities || "";
                    const amenitiesArray = amenitiesString.split(", ");
                    setSelectedAmenities(amenitiesArray);

                    console.log(amenitiesArray);
                } else {
                    console.log("No hotel data found.");
                }
            } catch (error) {
                console.error("Error fetching hotel data:", error);
            }
        };

        fetchHotelData();
    }, []);


    const handleSubmit = async () => {
        try {
            if (nameHotel === "" || address === "" || contactNumber === "" || email === "" || description === "" || selectedAmenities.length === 0) {
                alert("Please fill in all the required information.")
                return
            }
            if (!validatePhoneNumber(contactNumber)) {
                setPhoneError("The phone number must be 10 digits long.")
                return
            }
            if (!validateEmail(email)) {
                setEmailError("The email address is badly formatted.");
                return
            }
            
            console.log(image)

            const selectedAmenitiesString = selectedAmenities.join(", ");
            const formData = new FormData();
            formData.append('nameHotel', nameHotel);
            formData.append('address', address);
            formData.append('contactNumber', contactNumber);
            formData.append('email', email);
            formData.append('description', description);
            formData.append('id_city', selectedCity)
            formData.append('amenities', selectedAmenitiesString);
            formData.append('image', image); 

           
            await axios.patch(apiUrl + apiUrlHotel + hotel_id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Quan trọng
                },
            })
                .then((responsive) => {
                    if (responsive.data) {
                        alert("Update hotel successful.");
                    }
                })
                .catch((error) => {
                    console.log(error);
                    alert("An error occurred during registration.");
                });
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <div className="home-title">Edit Hotel</div>
            <div className='row-box flex'>
                <div className='add-box'>
                    <div className='Name-Hotel'>Name of hotel</div>
                    <input
                        className="Name-Hotel-Input"
                        type="text"
                        value={nameHotel}
                        onChange={(e) => setNameHotel(e.target.value)}
                    />

                </div>
                <div className='add-box'>
                    <label className='Name-Hotel'>City: </label>
                    <select
                        id="city"
                        value={selectedCity}
                        onChange={handleChangeCity}
                        className="select-city"
                    >
                        {dataCity && dataCity.length > 0 ? (
                            dataCity.map((city, index) => (
                                <option key={city.id} value={city._id}>{city.name}</option>

                            ))
                        ) : (
                            <tr>
                                <option value="">No city found</option>
                            </tr>
                        )}

                    </select>
                </div>
                <div className='add-box'>
                    <div className='Name-Hotel'>Address</div>
                    <input className='Name-Hotel-Input' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>


            </div>
            <div className="row-box flex">
                <div className='add-box'>
                    <div className='Name-Hotel'>Email</div>
                    <input
                        className='Name-Hotel-Input'
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmailError("")
                            setEmail(e.target.value)
                        }} />
                    {emailError ? <div className="errorStyle">{emailError}</div> : null}
                </div>
                <div className="add-box">
                    <div className="Name-Hotel">Select Amenities:</div>
                    <div className="flex checkbox-Amenities">
                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Wi-Fi"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Wi-Fi")} // Kiểm tra xem "Wi-Fi" có trong selectedAmenities không
                            />
                            Wi-Fi
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Hồ bơi"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Hồ bơi")}
                            />
                            Swimming Pool
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Phòng gym"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Phòng gym")}
                            />
                            Gym
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Minibar"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Minibar")}
                            />
                            Minibar
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Nhà hàng"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Nhà hàng")}
                            />
                            Restaurant
                        </label><br />
                    </div>
                </div>

            </div>
            <div className="flex row-box">
                <div className='add-box'>
                    <div className='Name-Hotel'>Contact number</div>
                    <input
                        className="Name-Hotel-Input"
                        type="text"
                        value={contactNumber}
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                            setContactNumber(e.target.value);
                            setPhoneError("")
                        }}
                    />
                    {errorPhone ? <div className="errorStyle">{errorPhone}</div> : null}
                </div>
                <div className="add-box flex">
                    <div>
                        <div className='Name-Hotel'>Images of hotel</div>
                        <input
                            className='add-hotel-img'
                            type="file"
                            accept="image/*"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div>

                        {image && (
                            <img
                                src={image}
                                alt="Hotel"
                                style={{ width: '150px', height: 'auto', marginBottom: '10px', marginLeft:'20px', borderRadius:'10%' }}
                            />
                        )}
                        </div>
                    </div>

                </div>
                <div style={{ marginTop: 20 }}>
                    <div className="Name-Hotel">Description:</div>
                    <textarea
                        rows="5"
                        cols="50"
                        placeholder="Enter hotel description..."
                        value={description}
                        onChange={handleChange}
                        className="textArea"
                    />
                </div>
                <div className="button-hotel flex">
                    <div className="button-hotel-back">
                        <Button bgColor="black" colorText='white' text='Back' onClick={() => handleBack()} />
                    </div>
                    <Button text='Update' onClick={() => handleSubmit()} />
                </div>
            </div>
            )
}

            export default EditHotel