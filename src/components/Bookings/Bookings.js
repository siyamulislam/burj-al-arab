import React, { useEffect, useState } from 'react';

const Bookings = () => {
    const [bookings,setBooking]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/bookings')
        .then(res=>res.json())
        .then(data=>setBooking(data))
    },[])
    return (
        <div>
            <h3>You Have {bookings.length} bookings</h3>
            {
                bookings.map((book )=> <li key={Math.random().toString(36).substr(2, 9)}>{book.name} From: {book.checkIn} To: {book.checkOut} </li>)
            }
        </div>
    );
};

export default Bookings;