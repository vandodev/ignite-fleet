import { useRef , useState} from 'react';
import { TextInput, ScrollView, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Container, Content } from './styles';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';
import { licensePlateValidate } from '../../utils/licensePlateValidate';

import { useNavigation } from '@react-navigation/native';
import { useUser } from '@realm/react';

import { useRealm } from '../../libs/realm';
import { Historic } from '../../libs/realm/schemas/Historic';

 
export function Departure() {
  const [description, setDescription] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const licensePlateRef = useRef<TextInput>(null);
  const descriptionRef = useRef<TextInput>(null);

  const [isRegistering, setIsResgistering] = useState(false);

  const realm = useRealm();
  const user = useUser();
  const { goBack } = useNavigation();

    function handleDepartureRegister() {
      try {
        if(!licensePlateValidate(licensePlate)) {
          licensePlateRef.current?.focus();
          return Alert.alert('Placa inválida', 'A placa é inválida. Por favor, informa a placa correta.')
        }
  
        if(description.trim().length === 0) {
          descriptionRef.current?.focus();
          return Alert.alert('Finalidade', 'Por favor, informe a finalidade da utilização do veículo')
        }
  
        setIsResgistering(false);
  
        realm.write(() => {
          realm.create('Historic', Historic.generate({
            user_id: user!.id,
            license_plate: licensePlate,
            description,
          }))
        });
  
        Alert.alert('Saída', 'Saída do veículo registrada com sucesso.');
  
        goBack();
      } catch (error) {;
        console.log(error);
        Alert.alert('Erro', 'Não possível registrar a saída do veículo.');
        setIsResgistering(false)
      }
    }

  return (
    <Container>
      <Header title='Saida' />

      <KeyboardAwareScrollView extraHeight={100}>
        <ScrollView>
          <Content>
            <LicensePlateInput
              ref={licensePlateRef}
              label='Placa do veículo'
              placeholder="BRA1234"
              returnKeyType='next'
              onChangeText={setLicensePlate}
            />

            <TextAreaInput
              ref={descriptionRef}
              label='Finalizade'
              placeholder='Vou utilizar o veículo para...'
              onSubmitEditing={handleDepartureRegister}
              returnKeyType='send'
              blurOnSubmit
              onChangeText={setDescription}
            />

            <Button 
              title='Registar Saída'
              onPress={handleDepartureRegister}
              isLoading={isRegistering}
            />
          </Content>
        </ScrollView>
        </KeyboardAwareScrollView>

    </Container>
  );
}