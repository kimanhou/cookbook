import React, { useState, useEffect } from 'react';
import Recipe from '../../../common/model/Recipe';
import RecipeView from './RecipeView';
import { useHistory } from 'react-router-dom';
import SearchBar from '../components/SearchBar';

interface IRecipeListViewProps{
    recipes : Recipe[];
}

const RecipeListView : React.FC<IRecipeListViewProps> = props => {
    const history = useHistory();
    const [recipes, setRecipes] = useState(props.recipes.slice());
    useEffect(() => {
        setRecipes(props.recipes.slice());
    }, [props.recipes]);

    const deleteRecipe = (recipe : Recipe) => {
        setRecipes(recipes => recipes.filter(n => n.getId() !== recipe.getId()));
    }

    const goToNewRecipePage = () => {
        history.push('/new-recipe');
    }
    const [filter, setFilter] = useState("");
    const filterRecipes = (recipes : Recipe[]) => {
        if (filter == "") {
            return recipes;
        }
        const newSearchLowerCase = filter.toLowerCase();
        return recipes.filter(t => t.getRecipeName().toLowerCase().includes(newSearchLowerCase)); 
    }

    return (
        <div>
            <button onClick={goToNewRecipePage}>Add new recipe</button>
            <SearchBar setFilter={setFilter}></SearchBar>
            {filterRecipes(recipes).map(recipe => 
                <RecipeView key={`${recipe.getId()}`} recipe={recipe} deleteRecipe={() => deleteRecipe(recipe)}/>
            )}
        </div>
    )
}
export default RecipeListView;