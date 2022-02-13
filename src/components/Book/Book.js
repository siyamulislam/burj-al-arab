import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateRangePicker from '@mui/lab/DateRangePicker';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { format } from "date-fns";
import Bookings from '../Bookings/Bookings';



const Book = () => {
    const { bedType } = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [value, setValue] = React.useState([new Date(), new Date()]);
    const saveDate = () => {
        var checkInDate = format(value[0], "dd/mm/yyyy");
        var checkOutDate = format(value[1], "dd/mm/yyyy"); 
        const dateRange={checkIn:checkInDate,checkOut:checkOutDate}
        const newBooking= {...loggedInUser,...dateRange}
        console.log(newBooking);
        fetch('http://localhost:5000/addBooking',{
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newBooking)

            })
            .then(res=> res.json())
            .then(result=> {
                if(result){
                    console.log('successfully added');
                }
            })
    }
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Hi, <span>{loggedInUser.name}</span>! Let's book a {bedType} Room.</h1>
            <p> Want a <Link to="/home">different room?</Link> </p>
            <h2>Booking List</h2>
            <Bookings></Bookings><br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="Check-in"
                        endText="Check-out"
                        inputFormat='dd/MM/yyyy'
                        value={value}
                        onChange={(newValue) => {
                            setValue(newValue);
                        }}
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 2 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                </LocalizationProvider>
            </div>
            <br />
            <Button variant="contained" onClick={() => saveDate()}>Book Now</Button>






        </div>
    );
};

export default Book;