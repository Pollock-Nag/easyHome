import React, { useEffect, useState } from 'react';
import { getUserByID } from '../../features/users/userAPI';
import {
  rejectRequest,
  acceptRequest,
  updatePosts,
} from './../../features/dailyHouse/dailyHouseAPI';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { retriveAllDailyHouses } from '../../features/dailyHouse/dailyHouseSlice';
import moment from 'moment';

function DailyBookingRequest({ house, bookerid }) {
  const [booker, setBooker] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (bookerid !== undefined) {
      // console.log('Booking id', bookerid);
      getUserByID(bookerid).then((res) => {
        // console.log(res);
        setBooker(res);
      });
    }
  }, []);

  const handleAccept = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { bookerid: bookerid };
        acceptRequest(house._id, data).then((res) => {
          console.log(res);
        });

        const essentials = {
          isavailable: false,
          isbooked: true,
          renterId: bookerid,
        };
        updatePosts(house._id, essentials);

        dispatch(retriveAllDailyHouses());
      }
    });
  };
  const handleReject = () => {
    // alert('sure to Rejected');
    // reject
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        const data = { bookerid: bookerid };
        console.log(house._id, data);
        rejectRequest(house._id, data).then((res) => {
          console.log(res);
        });
        dispatch(retriveAllDailyHouses());
      }
    });
  };

  let from = moment([
    Number(house.bookings[0].bookingForm.slice(0, 4)),
    Number(house.bookings[0].bookingForm.slice(5, 7)),
    Number(house.bookings[0].bookingForm.slice(8, 10)),
  ]);
  let to = moment([
    Number(house.bookings[0].bookingTo.slice(0, 4)),
    Number(house.bookings[0].bookingTo.slice(5, 7)),
    Number(house.bookings[0].bookingTo.slice(8, 10)),
  ]);
  return (
    <div>
      {booker ? (
        <>
          <div className="card mt-5 bg-base-100 shadow-lg w-[56vw] bg-[#daaaa64a]">
            <div className="flex justify-between p-6 items-center">
              <div className="flex gap-8 ">
                <div className="avatar">
                  <div className="w-16 rounded">
                    <img src="https://www.w3schools.com/howto/img_avatar.png" />
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-bold text-xl">{booker.userName}</span>
                  <span className="text-sm">{booker.email}</span>
                </div>
              </div>

              {/* <div className="flex gap-3 ">
                <span className="flex gap-1 items-center">
                  <i className="fa-solid fa-bed"></i>
                  <span>{house.bedroom}</span>
                </span>
                <span className="flex gap-1 items-center">
                  <i className="fa-solid fa-bath"></i>
                  <span>{house.bathroom}</span>
                </span>
                <span> {house.sqft + ' sqft'} </span>
              </div> */}

              {/* <div>
                <span className="font-bold text-lg">
                  <i className="fa-solid fa-bangladeshi-taka-sign"></i>
                  {house.rent}
                </span>
                <span className="text-md">/month</span>
              </div> */}

              <div className="flex gap-3 text-lg ">
                <span className="underline text-green-900 font-bold">
                  {moment(house.bookings[0].bookingForm).format('MMMM Do YYYY')}
                </span>
                <span className="font-bold"> ▶ </span>
                <span className="underline text-red-900 font-bold">
                  {moment(house.bookings[0].bookingTo).format('MMMM Do YYYY')}
                </span>
              </div>
              <div className="flex gap-1 font-bold text-xl text-gray-900 items-center">
                <span className="text-md "> {to.diff(from, 'days')}</span>
                <span className="text-md ">days</span>
              </div>

              <div className="flex gap-2  mt-1">
                <div className="font-bold text-lg ">
                  <i className="fa-solid fa-bangladeshi-taka-sign"></i>
                  {house.bookings[0].totalCost}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <button onClick={handleAccept}>
                  <div className="flex gap-2 items-center text-green-700 text-lg font-semibold hover:text-green-500 ">
                    <i className="fa-solid fa-check"></i>
                    <span>Accept</span>
                  </div>
                </button>
                <button onClick={handleReject}>
                  <div className="flex gap-2 items-center text-red-700 text-lg font-semibold  hover:text-red-500 ">
                    <i className="fa-solid fa-xmark"></i>
                    <span>Reject</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>{null}</>
      )}
    </div>
  );
}

export default DailyBookingRequest;
