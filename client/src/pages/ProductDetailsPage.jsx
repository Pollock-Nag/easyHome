import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Map from '../components/Products/Map';
import ProductDetails from '../components/Products/ProductDetails';
import ProductCarousel from '../components/Products/ProductCarousel';
import { retriveSelectedHouses } from './../features/houses/houseSlice';
import NavigationBar from '../components/Navigation/NavigationBar';

import { retriveSelectedDailyHouses } from './../features/dailyHouse/dailyHouseSlice';
import DailyBasisProductDetails from '../components/Products/DailyBasisProductDetails';

function ProductDetailsPage() {
  const dispatch = useDispatch();
  const { selectedHouse } = useSelector((state) => state.house);
  const { dailySelectedHouse } = useSelector((state) => state.dailyHouse);

  const { id } = useParams();

  console.log(id);
  useEffect(() => {
    dispatch(retriveSelectedHouses(id));
    // dispatch(retriveSelectedDailyHouses(id));
  }, []);

  return (
    <div>
      <NavigationBar isProductDetailsPage={true} />
      {selectedHouse.length > 0 ? (
        <>
          <ProductCarousel />
          <ProductDetails />

          {/* <ProductRating /> */}
          <Map />
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ProductDetailsPage;
