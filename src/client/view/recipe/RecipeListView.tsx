import React, { useState, useEffect } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeView from './RecipeView';
import NewRecipeView from './NewRecipeView';
import { useHistory } from 'react-router-dom';

interface IRecipeListViewProps{
    recipes : Recipe[];
}

const RecipeListView : React.FC<IRecipeListViewProps> = props => {
    const history = useHistory();
    const [recipes, setRecipes] = useState(props.recipes.slice());
    useEffect(() => {
        setRecipes(props.recipes.slice());
    }, [props.recipes]);
    const addRecipe = (recipe : Recipe) => {
        setRecipes(recipes => [...recipes, recipe]);
    }
    const deleteRecipe = (recipe : Recipe) => {
        setRecipes(recipes => recipes.filter(n => n.id !== recipe.id));
    }
    const goToNewRecipePage = () => {
        history.push('/new-recipe');
    }
    return (
        <div>
            <NewRecipeView addRecipe={addRecipe} />
            <button onClick={goToNewRecipePage}>Add new recipe</button>
            {recipes.map(recipe => 
                <RecipeView key={`${recipe.id}`} recipe={recipe} deleteRecipe={() => deleteRecipe(recipe)}/>
            )}
        </div>
    )
}
export default RecipeListView;