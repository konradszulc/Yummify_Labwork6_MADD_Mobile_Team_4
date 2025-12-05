import { useState } from 'react';

// TheMealDB API types
export interface Recipe {
  id: string;
  title: string;
  image: string;
  category?: string;
  area?: string;
}

export interface RecipeDetails {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: Array<{ ingredient: string; measure: string }>;
}

interface MealData {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
}

// TheMealDB is completely free, no API key needed just the base URL
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

export const useMealAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Search for recipes by name
  const searchRecipes = async (query: string): Promise<Recipe[]> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipes');
      }
      
      const data = await response.json();
      setLoading(false);
      
      if (!data.meals) {
        return [];
      }
      
      // Convert TheMealDB format to our Recipe format
      return data.meals.map((meal: MealData) => ({
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return [];
    }
  };

  // Get recipe details by ID
  const getRecipeDetails = async (id: string): Promise<RecipeDetails | null> => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch recipe details');
      }
      
      const data = await response.json();
      setLoading(false);
      
      if (!data.meals || data.meals.length === 0) {
        return null;
      }
      
      const meal = data.meals[0];
      
      // Extract ingredients and measures
      const ingredients: Array<{ ingredient: string; measure: string }> = [];
      
      for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        
        if (ingredient && ingredient.trim()) {
          ingredients.push({
            ingredient: ingredient.trim(),
            measure: measure ? measure.trim() : '',
          });
        }
      }
      
      return {
        id: meal.idMeal,
        title: meal.strMeal,
        image: meal.strMealThumb,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        ingredients,
      };
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
      return null;
    }
  };

  return {
    loading,
    error,
    searchRecipes,
    getRecipeDetails,
  };
};
