import { useRef } from 'react';
import { TextInput } from 'react-native';
import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Container, Content } from './styles';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';

export function Departure() {

  const descriptionRef = useRef<TextInput>(null);

  function handleDepartureRegister() {
    console.log('OK!');
  }

  return (
    <Container>
      <Header title='Saida' />

      <Content>
        <LicensePlateInput 
          label='Placa do veículo' 
          placeholder="BRA1234"
          onSubmitEditing={() => {
            descriptionRef.current?.focus()
          }}
          returnKeyType='next'
        />

        <TextAreaInput 
          ref={descriptionRef}
          label='Finalizade'
          placeholder='Vou utilizar o veículo para...'
          onSubmitEditing={handleDepartureRegister}
          returnKeyType='send'
          blurOnSubmit

        />

        <Button title='Registrar saida'  onPress={handleDepartureRegister}/>
      </Content>

    </Container>
  );
}