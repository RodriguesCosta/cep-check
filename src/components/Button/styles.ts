import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  width: 100%;
  height: 44px;
  background: #6cc05d;
  border-radius: 4px;

  justify-content: center;
  align-items: center;
`;

export const StyledButton = styled(RectButton)`
  width: 100%;
  flex: 1;

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #f1f0f0;
  font-size: 18px;
`;
