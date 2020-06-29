import React, {useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import Axios from 'axios';
import {useRoute} from '@react-navigation/native';

import {useLoading} from '../../Hooks/loading';

import {Container} from './styles';

const Mapa: React.FC = () => {
  const {setLoading} = useLoading();
  const route = useRoute();

  const [initialRegion, setInitialRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  useEffect(() => {
    async function loadCoordinates() {
      try {
        setLoading(true);
        const params = route.params as any;

        const response = await Axios.get(
          `https://geocode.xyz/${params.cep.city}%20-%20${params.cep.state}%20-%20Brazil?json=1`,
        );

        setInitialRegion((prevState) => {
          console.log({
            ...prevState,
            longitude: Number(response.data.longt),
            latitude: Number(response.data.latt),
          });
          return {
            ...prevState,
            longitude: Number(response.data.longt),
            latitude: Number(response.data.latt),
          };
        });
        setLoading(false);
      } catch {
        setLoading(false);
      }
    }
    loadCoordinates();
  }, [route, setLoading]);

  return (
    <Container>
      <MapView style={{flex: 1}} region={initialRegion} />
    </Container>
  );
};

export default Mapa;
