import moment from 'moment';
import React, { useState } from 'react';
// import BookingRequest from './BookingRequest';
import { updatePosts } from '../../features/dailyHouse/dailyHouseAPI';
import DailyBookingRequest from './DailyBookingRequest';

function EachProductCardDaily({ house, availablity }) {
  const bookingList = house.bookings;
  const [isAvailable, setIsAvailable] = useState(availablity);
  const handleAvailablityToggle = () => {
    alert('Are you sure to make this available ?');
    // console.log(house._id);
    let toggledValue = !isAvailable;
    let data = {
      isavailable: toggledValue,
    };
    updatePosts(house._id, data);
    setIsAvailable(toggledValue);
  };

  return (
    <div>
      <div className="card  bg-base-100 shadow-xl">
        <div className="card-body bg-[#dfdfe142] rounded-2xl w-[60vw]">
          <div className="flex justify-between">
            <div>
              <div className="font-semibold text-2xl">{house.housename}</div>
              <span>{house.area + ', ' + house.city}</span>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-xl">
                Available from{' '}
                {moment(house.availableform).format('Do') +
                  ' ' +
                  moment(house.availableform).format('MMMM') +
                  ' , ' +
                  moment(house.availableform).format('YYYY')}
              </div>
              <div className="flex gap-3 text-md justify-end">
                <span>Choose availablity :</span>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    className="toggle toggle-success"
                    defaultChecked={isAvailable}
                    onClick={handleAvailablityToggle}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Each property Renter Details */}

          {bookingList.length > 0 ? (
            <>
              {bookingList
                .filter((booking) => {
                  return booking.bookingstatus === 'pending';
                })
                .map((booking, i) => {
                  return (
                    <div>
                      <DailyBookingRequest
                        house={house}
                        bookerid={booking.bookerid}
                      />
                    </div>
                  );
                })}
            </>
          ) : (
            <>No requests yet</>
          )}
        </div>
      </div>
    </div>
  );
}
export default EachProductCardDaily;
