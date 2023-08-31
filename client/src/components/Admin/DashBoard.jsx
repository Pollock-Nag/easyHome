import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import RentedPropertyCard from './RentedPropertyCard';
import Barchart from '../Figures/Barchart';
import moment from 'moment';
import DoughnutJs from '../Figures/DoughnutJs';

import Leftsidebar from './Leftsidebar';
import RentedPropertyDaily from './RentedPropertyDaily';

function DashBoard() {
  const { loggedInUsers } = useSelector((state) => state.user);
  const { houseList } = useSelector((state) => state.house);
  const { dailyHouseList } = useSelector((state) => state.dailyHouse);

  const [monthname, setMonthname] = useState('january');
  // NEED TO DISPATCH
  // get DailyAllHOuse
  // Monthly get All house

  // For BarChart
  const labels = houseList
    .filter((house) => {
      return house.postby === loggedInUsers[0]._id;
    })
    .filter((house) => {
      return house.isbooked === true;
    })
    .filter(
      (house) =>
        moment(house.availableform).format('MMMM').toLowerCase() ===
        monthname.toLowerCase()
    )
    .map((house) => house.housename);
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Monthly Income',
        data: houseList
          .filter((house) => {
            return house.postby === loggedInUsers[0]._id;
          })
          .filter((house) => {
            return house.isbooked === true;
          })
          .map((house) => house.rent),
        // backgroundColor: 'rgba(255, 99, 132, 0.5)',

        backgroundColor: [
          'rgba(53, 162, 235, 0.8)',
          'rgba(25, 99, 132, 0.5)',

          'rgba(53, 162, 75, 0.5)',
          // '#C1311C',
          // '#B36C00',
          // '#3676D1',
        ],
      },
    ],
  };

  return (
    <div className="flex gap-10 ml-20 mt-5">
      {/* <div>{monthname}</div> */}
      {/* Left Side */}
      <Leftsidebar />

      {/* // Right side */}
      <div className="flex flex-col gap-5 mt-3">
        <div className="flex flex-col gap-3 mt-4 mb-4">
          <div className="font-bold text-3xl"> Property Dashboard</div>
          <div className=" text-xl">
            {' '}
            Welcome {loggedInUsers[0].userName.toUpperCase() + ' !'}
          </div>
        </div>
        <div className="flex gap-5">
          <div className="card bg-[#dfdfe1] w-[40vw] h-[50vh] bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="relative">
                <div className="mt-5">
                  <Barchart chartData={chartData} />
                </div>
                <div className="absolute ml-[28vw]  bottom-[35vh] ">
                  <select
                    className="select w-[9vw] select-sm select-secondary max-w-xs "
                    defaultValue={'Select Month'}
                    onChange={(e) => setMonthname(e.target.value)}
                  >
                    <option disabled selected>
                      Select Month
                    </option>
                    <option>January</option>
                    <option>Februaey</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="card bg-red-100 w-[25vw] h-[50vh] bg-base-100 shadow-xl">
            <div className="card-body">
              <DoughnutJs />
            </div>
          </div>
        </div>
        {/* For rent For sell  */}

        {/* Monthly Basis */}
        {houseList
          .filter((house) => {
            return house.postby === loggedInUsers[0]._id;
          })

          .filter((house) => {
            return house.isbooked === true;
          })
          .map((house, i) => {
            return (
              <div key={i}>
                <RentedPropertyCard house={house} />
              </div>
            );
          })}

        {/* Daily Basis */}
        {dailyHouseList
          .filter((house) => {
            return house.postby === loggedInUsers[0]._id;
          })

          .filter((house) => {
            return house.isbooked === true;
          })
          .map((house, i) => {
            return (
              <div key={i}>
                <RentedPropertyDaily house={house} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default DashBoard;
