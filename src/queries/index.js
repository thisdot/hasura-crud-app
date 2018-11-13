import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
  query {
    recipe {
      id
      name
      description
      time_to_prepare
      vegetarian
      calories_per_serving
      source
      food_category {
        id
        name
      }
      created_by
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
