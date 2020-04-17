import React from 'react';
import LoadData from '../components/async/LoadData';
import { useParams } from 'react-router-dom';
import RecipeController from '../../business/controller/RecipeController';
import RecipeDetailsView from './RecipeDetailsView';

const RecipePage : React.FC = props => {
    const {recipeId} = useParams();

    return (
        <LoadData promise = {RecipeController.get(parseInt(recipeId!))} >
            {recipe => <RecipeDetailsView recipe={recipe}/>}
        </LoadData>)
}

export default RecipePage;