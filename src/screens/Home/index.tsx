import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm  } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content } from "./styles";
import { HistoricCard } from '../../components/HistoricCard';

export function Home() {
  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const realm = useRealm();
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);

  function handleRegisterMoviment() {
    if(vehicleInUse?._id) {
      navigate('arrival', { id: vehicleInUse._id.toString() });
    } else {
      navigate('departure')
    }
  }

  function  fetchVehicleInUse() {
    try {
      const vehicle = historic.filtered("status='departure'")[0];
      setVehicleInUse(vehicle);
      // console.log(vehicle)
    } catch (error) {
      Alert.alert('Veículo em uso', 'Não foi possível carregar o veículo em uso.');
      console.log(error);
    }
  }

  useEffect(() => {
    fetchVehicleInUse();
  },[])

  useEffect(() => {
    realm.addListener('change', () => fetchVehicleInUse())
    return () => realm.removeListener('change', fetchVehicleInUse);
  },[])

  function fetchHistoric() {
    const response = historic.filtered("status='arrival' SORT(created_at DESC)");
    console.log(response)
  }

  useEffect(() => {
    fetchHistoric();
  },[historic]);

  return (
    <Container>
      <HomeHeader />
      <Content>
       {/* <CarStatus licensePlate="XXX-1234" /> */}
       <CarStatus licensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMoviment} />
       <HistoricCard data={{ created: '20/04', licensePlate: 'XXX1234', isSync: false }} />
      </Content>
    </Container>
  );
}
