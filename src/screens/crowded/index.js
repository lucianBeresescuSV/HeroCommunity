import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import axiosInstance from '../../apiInstance';

const CrowdedMap = () => {
  const [crowdedPoints, setCrowdedPoints] = useState([
    { longitude: 23.595192, latitude: 46.770277, weight: 10 },
  ]);

  // eslint-disable-next-line no-unused-vars
  const [currentLocation, setCurrentLocation] = useState({
    longitude: 23.595192,
    latitude: 46.770277,
  });

  useEffect(() => {
    axiosInstance({
      url: 'crowd',
      method: 'GET',
      params: {
        lat: currentLocation.latitude,
        long: currentLocation.longitude,
        radius: 30,
      },
    }).then((response) => {
      const tempArray = [];
      response.data.map((item) => {
        tempArray.push({ latitude: item.lat, longitude: item.long, weight: item.weight || 5 });
        return item;
      });
      setCrowdedPoints(tempArray);
    });
  }, []);

  return (
    <MapView
      style={{ flex: 1 }}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 1.0,
      }}
      onLongPress={(ev) => {
        const coords = ev.nativeEvent.coordinate;
        axiosInstance({
          url: 'crowd',
          method: 'POST',
          data: {
            lat: coords.latitude,
            long: coords.longitude,
            weight: 10,
          },
        }).then(() => {
          setCrowdedPoints([
            ...crowdedPoints,
            {
              latitude: coords.latitude,
              longitude: coords.longitude,
              weight: 10,
            },
          ]);
        });
      }}
    >
      <MapView.Heatmap points={crowdedPoints} opacity={1} />
    </MapView>
  );
};

export default CrowdedMap;
