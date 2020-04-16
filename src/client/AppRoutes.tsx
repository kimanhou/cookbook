import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import './AppRoutes.scss';
import RecipeController from './business/controller/RecipeController';
import LoadData from './view/components/async/LoadData';
import RecipeListView from './view/recipe/RecipeListView';
import RecipePage from './view/recipe/RecipePage';

const AppRoutes : React.FC = props => {

    return (
        <div className={`app-routes`}>
          <h1>Cookbook</h1>
          <div className={`app-routes-content`}>
                <Switch>
                    <Route path={`/recipes/:recipeId`}>
                        <RecipePage />
                    </Route>
                    <Route path={'/recipes'}>
                        <LoadData promise={RecipeController.getAll()}>
                            {recipes => <RecipeListView recipes={recipes}/>}
                        </LoadData>
                    </Route>
                </Switch>
          </div>
        </div>
    )
}
export default AppRoutes;