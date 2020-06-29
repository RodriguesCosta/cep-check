import React, {useState, useCallback, useEffect} from 'react';
import {FlatList, Text} from 'react-native';
import cepPromise from 'cep-promise';
import {useNavigation} from '@react-navigation/native';

import {useLoading} from '../../Hooks/loading';
import {useCep, CepData} from '../../Hooks/cep';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {ContainerSafe, Container, ContainerBreak, FlatListItem} from './styles';

const Home: React.FC = () => {
  const {setLoading} = useLoading();
  const navigation = useNavigation();
  const {ceps, saveCep} = useCep();
  const [cepInputValue, setCepInputValue] = useState<string>('');
  const [cepShowList, setCepShowList] = useState<CepData[]>([]);

  useEffect(() => {
    if (cepInputValue) {
      setCepShowList(
        ceps.filter((cepItem) => {
          return cepItem.cep.indexOf(cepInputValue) >= 0;
        }),
      );
    } else {
      setCepShowList(ceps);
    }
  }, [cepInputValue, ceps]);

  const SubmitCep = useCallback(async () => {
    try {
      setLoading(true);
      const responseCep = await cepPromise(cepInputValue);
      await saveCep(responseCep);
      setCepInputValue('');
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }, [cepInputValue, setLoading, saveCep]);

  return (
    <ContainerSafe>
      <Container>
        <Input
          placeholder="Digite um CEP"
          maxLength={8}
          keyboardType="numeric"
          value={cepInputValue}
          onChangeText={setCepInputValue}
          returnKeyType="done"
          onSubmitEditing={SubmitCep}
        />
        <Button onPress={SubmitCep}>SALVAR</Button>

        <ContainerBreak />

        <FlatList
          data={cepShowList}
          keyExtractor={({cep}) => cep}
          renderItem={({item}) => (
            <FlatListItem
              onPress={() => {
                navigation.navigate('Mapa', {cep: item});
              }}>
              <Text>CEP: {item.cep}</Text>
              <Text>
                {item.city} - {item.state}
              </Text>
            </FlatListItem>
          )}
        />
      </Container>
    </ContainerSafe>
  );
};

export default Home;
