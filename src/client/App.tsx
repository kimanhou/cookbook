import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ServerStatus from '../common/model/ServerStatus';
import './App.scss';
import AppRoutes from './AppRoutes';

const App : React.FC = props => {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(ServerStatus.deserialize)
      .then(setServerStatus);
  }, [])
  return (
    <BrowserRouter>
    <div>
      {serverStatus != null ? 
        <h2 className={`live`}>Server is live</h2> : 
        <h2 className={`down`}>Server is down</h2>
      }
      <AppRoutes/>
    </div>
    </BrowserRouter>
  );
}
export default App;
