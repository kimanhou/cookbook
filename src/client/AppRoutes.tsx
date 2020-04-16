import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './AppRoutes.scss';
import RecipeController from './business/controller/RecipeController';
import LoadData from './view/components/async/LoadData';
import RecipeListView from './view/recipe/RecipeListView';
import RecipePage from './view/recipe/RecipePage';
import NewRecipeView from './view/recipe/NewRecipeView';
import AddNewRecipe from './view/recipe/AddNewRecipe';

const AppRoutes : React.FC = props => {
    const history = useHistory();
    const goToHome = () => {
        history.push('/');
    }

    return (
        <div className={`app-routes`}>
          <h1 onClick={goToHome}>Cookbook</h1>
          <div className={`app-routes-content`}>
                <Switch>
                    <Route path={`/recipes/:recipeId`}>
                        <RecipePage />
                    </Route>
                    <Route path={'/new-recipe'}>
                        <AddNewRecipe/>
                    </Route>
                    <Route path={'/recipes'}>
                        <LoadData promise={RecipeController.getAll()}>
                            {recipes => <RecipeListView recipes={recipes}/>}
                        </LoadData>
                    </Route>
                    <Route path={'/'}>
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