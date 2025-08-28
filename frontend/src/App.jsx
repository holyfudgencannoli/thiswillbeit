import React, { useState } from 'react';
import Login from './Login';

function App() {
  const [token, setToken] = useState(null);

  return (
    <div>
      {token ? <h2>Logged in with token: {token}</h2> : <Login setToken={setToken} />}
    </div>
  );
}

export default App;
