import { Alert, FlatList  } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useQuery, useRealm  } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';
import { CarStatus } from "../../components/CarStatus";
import { HomeHeader } from "../../components/HomeHeader";
import { Container, Content , Label, Title } from "./styles";
import { HistoricCard, HistoricCardProps  } from '../../components/HistoricCard';
import { getLastAsyncTimestamp, saveLastSyncTimestamp } from '../../libs/asyncStorage/syncStorage';
import dayjs from 'dayjs';
import { useUser } from '@realm/react';
import Toast from 'react-native-toast-message';

export function Home() {
  const { navigate } = useNavigation();
  const historic = useQuery(Historic);
  const realm = useRealm();
  const user = useUser();
  const [vehicleInUse, setVehicleInUse] = useState<Historic | null>(null);
  const [vehicleHistoric, setVehicleHistoric] = useState<HistoricCardProps[]>([]);

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
    return () => {
      if(realm && !realm.isClosed) {
        realm.removeListener('change', fetchVehicleInUse)
      }
    };
  },[])

  async function progressNotification(transferred: number, transferable: number) {
    const percentage = (transferred/transferable) * 100;

    if(percentage === 100) {
      await saveLastSyncTimestamp();
      await fetchHistoric();

      Toast.show({
        type: 'info',
        text1: 'Todos os dados estão sincronizado.'
      })
      
    }
  }

  async function fetchHistoric() {
      
    try {
      const response = historic.filtered("status='arrival' SORT(created_at DESC)");
      const lastSync = await getLastAsyncTimestamp();
      const formattedHistoric = response.map((item) => {
        return ({
          id: item._id.toString(),
          licensePlate: item.license_plate,
          isSync: lastSync > item.updated_at!.getTime(),
          created: dayjs(item.created_at).format('[Saída em] DD/MM/YYYY [às] HH:mm')

        })
      })
      setVehicleHistoric(formattedHistoric);
    } catch (error) {
      console.log(error);
      Alert.alert('Histórico', 'Não foi possível carregar o histórico.')
    }
  }

  function handleHistoricDetails(id: string) {
    navigate('arrival', { id })
  }

  useEffect(() => {
    fetchHistoric();
  },[historic]);

  useEffect(() => {
    realm.subscriptions.update((mutableSubs, realm) => {
      const historicByUserQuery = realm.objects('Historic').filtered(`user_id = '${user!.id}'`);

      mutableSubs.add(historicByUserQuery, { name: 'hostoric_by_user' });
    })
  },[realm]);

  useEffect(() => {
    const syncSession = realm.syncSession;

    if(!syncSession) {
      return;
    }

    syncSession.addProgressNotification(
      Realm.ProgressDirection.Upload,
      Realm.ProgressMode.ReportIndefinitely,
      progressNotification
    )

    return () => {
      syncSession.removeProgressNotification(progressNotification);
    }
  },[]);

  return (
    <Container>
      <HomeHeader />
      <Content>
       {/* <CarStatus licensePlate="XXX-1234" /> */}
       <CarStatus licensePlate={vehicleInUse?.license_plate} onPress={handleRegisterMoviment} />
       

       <Title>
          Histórico
        </Title>

        <FlatList 
          data={vehicleHistoric}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <HistoricCard data={item} onPress={() => handleHistoricDetails(item.id)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={(
            <Label>
              Nenhum registro de utilização.
            </Label>
          )}
        />

      </Content>
    </Container>
  );
}
