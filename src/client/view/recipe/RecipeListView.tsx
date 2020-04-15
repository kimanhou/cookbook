import React, { useState, useEffect } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeView from './RecipeView';
import NewRecipeView from './NewRecipeView';

interface IRecipeListViewProps{
    recipes : Recipe[];
}

const RecipeListView : React.FC<IRecipeListViewProps> = props => {
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
    return (
        <div>
            {recipes.map(recipe => 
                <RecipeView key={`${recipe.id}`} recipe={recipe} deleteRecipe={() => deleteRecipe(recipe)}/>
            )}
            <NewRecipeView addRecipe={addRecipe} />
        </div>
    )
}
export default RecipeListView;