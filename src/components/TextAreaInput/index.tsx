import { TextInput, TextInputProps } from 'react-native';
import { forwardRef } from 'react';
import { useTheme } from 'styled-components/native';

import { Container, Input, Label } from './styles';

type Props = TextInputProps & {
  label: string;
}

const TextAreaInput = forwardRef<TextInput, Props>(({ label, ...rest }, ref) => {
  const { COLORS } = useTheme()

  return (
    <Container>
      <Label>
        {label}
      </Label>

      <Input 
        ref={ref}
        placeholderTextColor={COLORS.GRAY_400}
        multiline
        autoCapitalize='sentences'
        {...rest}
      />
    </Container>
);
})

export { TextAreaInput }