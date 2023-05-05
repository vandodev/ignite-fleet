import { Header } from '../../components/Header';
import { LicensePlateInput } from '../../components/LicensePlateInput';
import { Container, Content } from './styles';
import { TextAreaInput } from '../../components/TextAreaInput';

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
      </Content>

    </Container>
  );
}