import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query {
    recipe {
      id
      name
      description
      time_to_prepare
      number_of_servings
      calories_per_serving
    }
  }
`;

export const RECIPE_QUERY = gql`
  query($recipeId: Int!) {
    recipe(where: { id: { _eq: $recipeId } }) {
      id
      name
      description
      instructions
      number_of_servings
      vegetarian
      calories_per_serving
      source
      food_category_id
      created_by
      time_to_prepare
      recipe_ingredients {
        id
        ingredient {
          id
          name
        }
        quantity
        comments
      }
    }
  }
`;

export const FOOD_CATEGORY_RECIPE = gql`
  query {
    food_category(order_by: { id: asc }) {
      id
      name
    }
  }
`;

export const INGREDIENTS = gql`
  query {
    ingredient(order_by: { id: asc }) {
      id
      name
    }
  }
`;
