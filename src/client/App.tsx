import React, { useEffect, useState } from 'react';
import ServerStatus from '../common/model/ServerStatus';
import './App.scss';
import RecipeController from './business/controller/RecipeController';
import LoadData from './view/components/async/LoadData';
import RecipeListView from './view/recipe/RecipeListView';

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
      <h1>Cookbook</h1>
      {serverStatus != null ? 
        <h2 className={`live`}>Server is live</h2> : 
        <h2 className={`down`}>Server is down</h2>
      }
      <LoadData promise={RecipeController.getAll()}>
        {recipes =>
          <RecipeListView recipes={recipes}/>
        }
      </LoadData>
    </div>
  );
}
export default App;
