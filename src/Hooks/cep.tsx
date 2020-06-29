import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export interface CepData {
  cep: string;
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

interface CepContextData {
  ceps: CepData[];
  saveCep(cep: CepData): void;
  findCep(cep: string): CepData | undefined;
  removeCep(cep: string): void;
}

export const CepContext = createContext<CepContextData>({} as CepContextData);

export const CepProvider: React.FC = ({children}) => {
  const [ceps, setCeps] = useState<CepData[]>([]);

  useEffect(() => {
    async function loadAsyncStorage() {
      const asyncCeps = await AsyncStorage.getItem('ceps');
      if (asyncCeps) {
        setCeps(JSON.parse(asyncCeps));
      }
    }
    loadAsyncStorage();
  }, []);

  useEffect(() => {
    async function loadAsyncStorage() {
      if (ceps.length > 0) {
        await AsyncStorage.setItem('ceps', JSON.stringify(ceps));
      }
    }
    loadAsyncStorage();
  }, [ceps]);

  const findCep = useCallback(
    (cep: string) => {
      return ceps.find((cepItem) => {
        return cepItem.cep === cep;
      });
    },
    [ceps],
  );

  const removeCep = useCallback((cep: string) => {
    setCeps((currentCeps) => {
      return currentCeps.filter((cepItem) => {
        return cepItem.cep !== cep;
      });
    });
  }, []);

  const saveCep = useCallback(
    (cep: CepData) => {
      const cepFinded = findCep(cep.cep);

      if (!cepFinded) {
        setCeps((currentCeps) => {
          return [...currentCeps, cep];
        });
      }
    },
    [findCep],
  );

  return (
    <CepContext.Provider value={{ceps, saveCep, findCep, removeCep}}>
      {children}
    </CepContext.Provider>
  );
};

export function useCep(): CepContextData {
  const context = useContext(CepContext);

  if (!context) {
    throw new Error('useCep must be used within an CepProvider');
  }

  return context;
}
