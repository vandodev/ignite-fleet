import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Container, Content } from './styles';
import { TextAreaInput } from '../../components/TextAreaInput';
import { Button } from '../../components/Button';

export function Departure() {
  return (
    <Container>
      <Header title='Saida' />

      <Content>
        <LicensePlateInput 
          label='Placa do veículo' 
          placeholder="BRA1234"
        />

        <TextAreaInput 
          label='Finalizade'
          placeholder='Vou utilizar o veículo para...'
        />

        <Button title='Registrar saida'/>
      </Content>

    </Container>
  );
}