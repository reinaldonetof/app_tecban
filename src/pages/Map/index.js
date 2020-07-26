import React, {useState, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

import MapBoxGL from '@react-native-mapbox-gl/maps';

MapBoxGL.setAccessToken(
  'pk.eyJ1IjoicmVpbmFsZG9uZXRvZiIsImEiOiJja2Qya3hmYzYwNzA0MnRrY2M3bWY1d3ZmIn0.OzycZq3BgPgipIq8j3o59A',
);

export default function Map({navigation}) {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [userPosition, setUserPosition] = useState(false);

  async function verifyLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('permissão concedida');
        setHasLocationPermission(true);
      } else {
        console.log('permissão negada');
        setHasLocationPermission(false);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    verifyLocationPermission();

    if (hasLocationPermission) {
      Geolocation.getCurrentPosition((position) => {
        setUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, [hasLocationPermission]);

  return (
    <MapBoxGL.MapView style={{flex: 1}} styleURL={MapBoxGL.StyleURL.Dark}>
      <MapBoxGL.Camera
        centerCoordinate={[
          userPosition.longitude || -44.2194616,
          userPosition.latitude || -2.5464294,
        ]}
        zoomLevel={15}
      />
    </MapBoxGL.MapView>
  );
}
