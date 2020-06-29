import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const ContainerSafe = styled.SafeAreaView`
  flex: 1;
  background-color: #915fc1;
`;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

export const ContainerBreak = styled.View`
  height: 20px;
`;

export const FlatListItem = styled(RectButton)`
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  margin-bottom: 5px;
`;
