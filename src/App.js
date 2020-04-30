import React from 'react';
//Amplify
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
//Vistas
import Authentication from './views/Auth/Authentication';

Amplify.configure(aws_exports);

function App() {
  return (
    <Authentication />
  );
}

export default App;
