import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import Search from './Search.jsx';
import BarInfo from './BarInfo.jsx';
import PeopleSearch from './PeopleSearch.jsx';
import QuickCreate from './QuickCreate.jsx';
import mapStyle from '../../../helpers/mapStyle'
import { Details } from '@material-ui/icons';
import BarCard from './BarInfoCardTest.jsx';

// used for the load script to get google places
const libraries = ['places'];

const mapStyles = {
  width: '98vw',
  height: '75vh'
};

const options = {
  zoomControl: true,
  scaleControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  styles: mapStyle
};

const searchBox = {
  boxSizing: `border-box`,
  border: `1px solid transparent`,
  width: `240px`,
  height: `32px`,
  padding: `0 12px`,
  borderRadius: `3px`,
  boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
  fontSize: `14px`,
  outline: `none`,
  textOverflow: `ellipses`,
  position: "absolute",
  left: "50%",
  marginLeft: "-120px"
};


const MapContainer = () => {
  const [ currentPosition, setCurrentPosition ] = useState({
    lat: 29.951065,
    lng: -90.071533
  });
  const [ publicLocations, setPublicLocations ] = useState([]);
  const [ friendLocations, setFriendLocations ] = useState([]);
  const [ selectedItem, setSelectedItem ] = useState({});
  const [ myLocation, setMyLocation ] = useState({});
  const [ markers, setMarkers ] = useState([]);
  const [ searchMarker, setSearchMarker ] = useState({});
  const [ click, setClick ] = useState(false);
  const [ placeInfo, setplaceInfo ] = useState(null);

  const defaultCenter = {
    lat: 29.951065,
    lng: -90.071533,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    libraries
  });

  // sets the makers to the user click
  const onMapClick = useCallback((e) => {
    setMarkers(current => [
      ...current, 
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date()
      }
    ]);
  });

  // save reference to map to use it later and not reload state
  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // move map to the where the user has searched
  const panTo = useCallback(({ lat, lng }) => {
    console.log(mapRef)
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
    setCurrentPosition({ lat, lng });
    setSearchMarker({ lat, lng });
  }, []);

  const handleMarkerClick = (e) => {
    setClick(!click);
  };

  const getMyLocation = ({ latitude, longitude }) => {
    setMyLocation({
      lat: latitude,
      lng: longitude
    });
  };

  // get places info from search bar
  const getPlaceInfo = useCallback((results) => {
    const { lat, lng } = results; 
    setSearchMarker({ lat, lng });
    setplaceInfo(results);
  }, []);

  if (loadError) {
    return 'Error loading maps';
  } 
  if (!isLoaded) {
    return 'Loading maps';
  }

  return (

    <div style={{align: 'center'}}>
      <QuickCreate 
        getMyLocation={getMyLocation} 
        panTo={panTo}
      />
      <PeopleSearch searchBox={searchBox} />
      <Search 
        panTo={panTo}
        currentPosition={currentPosition}
        searchBox={searchBox}
        getPlaceInfo={getPlaceInfo}
      />
      <GoogleMap 
        mapContainerStyle={mapStyles}
        zoom={15}
        center={currentPosition  ? currentPosition : defaultCenter}
        options={options}
        draggable={true}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
          <Marker
            onClick={handleMarkerClick}
            position={{
              lat: +searchMarker.lat, 
              lng: +searchMarker.lng
            }}
          />
          {/* {click ? <BarInfo
            placeInfo={placeInfo}
            searchMarker={searchMarker}  
          /> : null} */}

        {/* {markers.map(({lat, lng, time}) => (
          <Marker 
          key={time.toISOString()} 
          position={{ lat, lng }}
          />
        ))} */}
      </GoogleMap>
      {click ? <BarInfo
            placeInfo={placeInfo}
            searchMarker={searchMarker}  
            /> : null}
    </div>
  );

};


// {click ? <InfoWindow
//   position={{
//     lat: +searchMarker.lat, 
//     lng: +searchMarker.lng
//   }}
// >
//   <div>

//   </div>
// </InfoWindow> 

// : null}

// //////////////////////////////////////////////////////////////////////////
// ///////////////////             dummy info            ///////////////////

// import { results } from './places.json';

// const MapContainer = () => {

//   const [ currentPosition, setCurrentPosition ] = useState(null);
//   const [ publicLocations, setPublicLocations ] = useState([]);
//   const [ friendLocations, setFriendLocations ] = useState([]);
//   const [ selectedItem, setSelectedItem ] = useState({});
//   const [ myLocation, setMyLocation ] = useState({});
//   const [ markers, setMarkers ] = useState([]);
//   const [ searchMarker, setSearchMarker ] = useState({});

//   const [ bars, setBars ] = useState(results);

//   const mapStyles = {
//     width: '100vw',
//     height: '100vh'
//   };
//   const defaultCenter = {
//     lat: 29.951065,
//     lng: -90.071533,
//   };
//   const options = {
//     zoomControl: true
//   };

//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
//     libraries
//   });

//   // sets the makers to the user click
//   const onMapClick = useCallback((e) => {
//     setMarkers(current => [
//       ...current, 
//       {
//         lat: e.latLng.lat(),
//         lng: e.latLng.lng(),
//         time: new Date()
//       }
//     ]);
//   });

//   // save reference to map to use it later and not reload state
//   const mapRef = useRef();
//   const onMapLoad = useCallback((map) => {
//     mapRef.current = map;
//   }, []);

//   // move map to the where the user has searched
//   const panTo = useCallback(({ lat, lng }) => {
//     console.log('current mapref', mapRef.current);
//     mapRef.current.panTo({ lat, lng });
//     mapRef.current.setZoom(16);
//     setCurrentPosition({ lat, lng });
//     setSearchMarker({ lat, lng });
//   }, []);

//   // get places info from search bar
//   // const searchInfo = useCallback(({ lat, lng}) => {
//   //   setSearchMarker({ lat, lng });
//   // }, []);

//   if (loadError) {
//     return 'Error loading maps';
//   } 
//   if (!isLoaded) {
//     return 'Loading maps';
//   }

//   return (
//     <>
//       <Search panTo={panTo} />
//       <GoogleMap 
//         mapContainerStyle={mapStyles}
//         zoom={15}
//         center={currentPosition  ? currentPosition : defaultCenter}
//         options={options}
//         draggable={true}
//         onClick={onMapClick}
//         onLoad={onMapLoad}
//       >
//         {/* <Marker 
//           position={{
//             lat: +searchMarker.lat, 
//             lng: +searchMarker.lng
//           }}/> */}
//         {bars.map(({ geometry: { location: { lat, lng } } }) => (
//           <Marker 
//             position={{ lat, lng }}
//             onClick={}
//           />
//         ))}
//       </GoogleMap>
//     </>

//   );

// };

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////


export default MapContainer;
