import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import Button from "../components/button";
import axios from "axios";

const AddHotel = () => {
    const navigate = useNavigate();

    const apiUrl = import.meta.env.VITE_API_URL;
    const apiUrlHotel = import.meta.env.VITE_API_URL_HOTEL;
    const apiUrlCity = import.meta.env.VITE_API_URL_CITY;
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const [nameHotel, setNameHotel] = useState("")
    const [address, setAddress] = useState("")
    const [contactNumber, setContactNumber] = useState("")
    const [email, setEmail] = useState("")

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState('');
    const [errorPhone, setPhoneError] = useState("")
    const [selectedCity, setSelectedCity] = useState('');
    const [dataCity, setDataCity] = useState('')

    const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
    };
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
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

    const handleBack = async () => {
        navigate('/Hotel-management');
    }

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

    const handleSubmit = async () => {
        try {
            if (nameHotel === "" || address === "" || contactNumber === "" || email === "" || description === "" || selectedAmenities.length === 0) {
                alert("Please fill in all the required information.");
                return;
            }
            if (!validatePhoneNumber(contactNumber)) {
                setPhoneError("The phone number must be 10 digits long.");
                return;
            }
            if (!validateEmail(email)) {
                setEmailError("The email address is badly formatted.");
                return;
            }
            if (!image) {
                alert('Please upload an image.');
                return;
            }

            const selectedAmenitiesString = selectedAmenities.join(", ");
            console.log(image)
            const formData = new FormData();
            formData.append('nameHotel', nameHotel);
            formData.append('address', address);
            formData.append('contactNumber', contactNumber);
            formData.append('email', email);
            formData.append('description', description);
            formData.append('id_city', selectedCity)
            formData.append('amenities', selectedAmenitiesString);
            formData.append('total_rooms', "0");
            formData.append('booked_rooms', "0");
            formData.append('available_rooms', "0");
            formData.append('image', image); 

            console.log(apiUrl + apiUrlHotel);

            // Gửi API với FormData
            const response = await axios.post(apiUrl + apiUrlHotel, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Quan trọng
                },
            });

            if (response.data) {
                alert("Add hotel successful.");
            }
            // Reset lại form sau khi thành công
            setAddress("");
            setEmail("");
            setDescription("");
            setNameHotel("");
            setContactNumber("");
            setSelectedAmenities([]);
            setImage(null);
        } catch (error) {
            console.error("Error submitting hotel:", error.response?.data || error.message);
            alert("An error occurred during registration.");
        }
    };

    return (
        <div>
            <div className="home-title">Add Hotel</div>
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
                                checked={selectedAmenities.includes("Wi-Fi")}
                            />
                            Wi-Fi
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Swimming Pool"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Swimming Pool")}
                            />
                            Swimming Pool
                        </label><br />

                        <label className="box-checkbox">
                            <input
                                className="checkbox"
                                type="checkbox"
                                value="Gym"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Gym")}
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
                                value="Restaurant"
                                onChange={handleCheckboxChange}
                                checked={selectedAmenities.includes("Restaurant")}
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
                <div className="add-box">
                    <div className='Name-Hotel'>Images of hotel</div>
                    <input
                        className='add-hotel-img'
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange} />
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
                <Button text='Submit' onClick={() => handleSubmit()} />
            </div>
        </div>
    )
}

export default AddHotel