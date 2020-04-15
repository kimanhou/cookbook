import React, { useEffect, useState } from 'react';
import ServerStatus from '../common/model/ServerStatus';
import './App.scss';
import LoadData from './view/components/async/LoadData';
import NoteController from './business/controller/NoteController';
import NoteListView from './view/note/NoteListView';

const App : React.FC = props => {
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null);
  useEffect(() => {
    fetch('/api/status')
      .then(res => res.json())
      .then(ServerStatus.deserialize)
      .then(setServerStatus);
  }, [])
  return (
    <div>
      <h1>TSX Fullstack Template</h1>
      {serverStatus != null ? 
        <h2 className={`live`}>Server is live</h2> : 
        <h2 className={`down`}>Server is down</h2>
      }
      <LoadData promise={NoteController.getAll()}>
        {notes =>
          <NoteListView notes={notes}/>
        }
      </LoadData>
    </div>
  );
}
export default App;
