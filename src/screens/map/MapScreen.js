import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import MapView, { Polyline, Circle, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Text } from 'react-native';
import { decode } from '../../utils';
import axiosInstance from '../../apiInstance';

const createAnnotations = (data, onPressCallback) => {
  return data.map((locationData) => {
    // locationData.id = String(locationData.id)
    return (
      <MapView.Marker
        key={locationData.id}
        description={`${locationData.description}\n${locationData.phoneNo}`}
        coordinate={{
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        }}
        title={locationData.name}
        onPress={() => {
          onPressCallback({ latitude: locationData.latitude, longitude: locationData.longitude });
        }}
      >
        <Callout>
          <Text>Description: {locationData.title}</Text>
          <Text>Phone number: {locationData.phone}</Text>
          <Text>Location hint: {locationData.address}</Text>
        </Callout>
      </MapView.Marker>
    );
  });
};

const API_KEY = 'sg-51Jyqily_Q0pyxgrVZZDNlDau3qVnYSm5EDE5IeI';

const MapScreen = () => {
  const instance = Axios.create({
    baseURL: '',
    timeout: 1000,
  });

  // eslint-disable-next-line no-unused-vars
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 23.595192,
    latitude: 46.770277,
  });

  const [annotations, setAnnotations] = useState([]);
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    axiosInstance({
      method: 'GET',
      url: `help`,
      params: {
        lat: currentLocation.latitude,
        long: currentLocation.longitude,
      },
    })
      .then((response) => {
        const tempAnnotation = [];
        response.data.map((item) => {
          tempAnnotation.push({
            latitude: item.lat,
            longitude: item.long,
            title: item.desc,
            phone: item.phone,
            address: item.address,
          });
          return item;
        });
        setAnnotations(tempAnnotation);
      })
      .catch(() => {});
  }, []);

  const onPressCallout = (destination) => {
    const tempArray = [];
    instance
      .get(
        `https://router.hereapi.com/v8/routes?apiKey=${API_KEY}&transportMode=car&origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}&return=polyline`
      )
      .then((response) => {
        decode(response.data.routes[0].sections[0].polyline).polyline.map((item) => {
          tempArray.push({ latitude: item[0], longitude: item[1] });
          return item;
        });
        setCoordinates(tempArray);
      })
      .catch(() => {});
  };

  return (
    <MapView
      style={{ flex: 1 }}
      annotations={annotations}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      }}
    >
      {createAnnotations(annotations, onPressCallout)}
      <Circle
        center={currentLocation}
        radius={100}
        strokeColor="red"
        fillColor="blue"
        strokeWidth={2}
      />
      <Polyline coordinates={coordinates} strokeColor="blue" strokeWidth={6} />
    </MapView>
  );
};

export default MapScreen;
