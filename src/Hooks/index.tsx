import React from 'react';

import {LoadingProvider} from './loading';
import {CepProvider} from './cep';

const Hooks: React.FC = ({children}) => (
  <LoadingProvider>
    <CepProvider>{children}</CepProvider>
  </LoadingProvider>
);

export default Hooks;
