import React from 'react';
import {TextInputProps} from 'react-native';

import {Container, StyledInput} from './styles';

export interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = ({...rest}) => {
  return (
    <Container>
      <StyledInput placeholderTextColor="#787878" {...rest} />
    </Container>
  );
};

export default Input;
