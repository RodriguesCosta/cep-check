import React from 'react';

import {Container, StyledButton, ButtonText} from './styles';

interface ButtonProps {
  children: string;
  onPress?(): void;
}

const Button: React.FC<ButtonProps> = ({onPress, children, ...rest}) => {
  return (
    <Container {...rest}>
      <StyledButton onPress={onPress}>
        <ButtonText>{children}</ButtonText>
      </StyledButton>
    </Container>
  );
};

export default Button;
