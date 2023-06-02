import React from 'react';
import GoogleMapReact from 'google-map-react';
import hospitalLocations from './hospitalLocations.json';

const HospitalMarker = () => (
  <div className="flex justify-center items-center w-4 h-4 rounded-full bg-red-600">
    <div className="w-2 h-2 rounded-full bg-white"></div>
  </div>
);

const HospitalCard = ({ hospital }) => {
  const { name, city, street, phoneNumber, latitude, longitude } = hospital;

  const center = { lat: latitude, lng: longitude };

  return (
    <div className="w-full bg-gray-50 md:w-1/2 lg:w-1/3 p-4 bg-gray-100 rounded-xl p-8 m-4">
       <div className="mt-4 mb-6 text-gray-800">
        <p className="text-2xl font-bold">{name}</p>
      </div>
      <div className="h-56 md:h-64 lg:h-80">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBewRNKS1_9MVxEbzvrn2qrhQqVWguLeJk" }}
          defaultCenter={center}
          defaultZoom={14}
        >
          <HospitalMarker lat={latitude} lng={longitude} />
        </GoogleMapReact>
      </div>
      <div className="mt-4 text-gray-800">
        <p className="text-lg font-bold">{city}</p>
        <p className="text-sm">{street}</p>
        <p className="text-lg font-bold text-blue-500">{phoneNumber}</p>
      </div>
    </div>
  );
};

const HospitalScreen = () => {
  return (
    <div className="flex flex-wrap justify-center items-center h-screen">
      {hospitalLocations.map((hospital) => (
        <HospitalCard key={hospital.id} hospital={hospital} />
      ))}
    </div>
  );
};

export default HospitalScreen;
