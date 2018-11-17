import { router } from '@/router';
import gqlClient from '@/services/apollo';
import { authService } from '@/services/auth/AuthService';

import {
  RECIPES_QUERY,
  RECIPE_QUERY,
  FOOD_CATEGORY_RECIPE_QUERY,
  INGREDIENTS_QUERY,
  RECIPE_INGREDIENT_MUTATION,
  RECIPE_UPDATE_MUTATION
} from '@/queries';

let state = {
  all: [],
  one: {},
  foodCategoryList: [],
  ingredientList: [],
  isLoading: false
};

const actions = {
  async findAll({ commit }) {
    commit('setLoading', true);
    const response = await gqlClient.query({
      query: RECIPES_QUERY
    });
    commit('setRecipeList', response.data.recipe);
  },
  async findOne({ commit }, recipeId) {
    commit('setLoading', true);

    const response = await gqlClient.query({
      query: RECIPE_QUERY,
      variables: { recipe_id: recipeId }
    });
    commit('setRecipe', response.data.recipe[0]);
  },
  async fetchFoodCategoryList({ commit }) {
    const response = await gqlClient.query({
      query: FOOD_CATEGORY_RECIPE_QUERY
    });
    commit('setFoodCategoryList', response.data.food_category);
  },
  async fetchIngredientList({ commit }) {
    const response = await gqlClient.query({ query: INGREDIENTS_QUERY });
    commit('setIngredientList', response.data.ingredient);
  },
  async InsertRecipeIngredient({ dispatch, commit }, recipeIngredient) {
    const response = await gqlClient.mutate({
      mutation: RECIPE_INGREDIENT_MUTATION,
      variables: {
        ...recipeIngredient
      },
      update: (store, { data: { insert_recipe_ingredient } }) => {
        // Read the data from our cache for this query.
        try {
          if (
            !insert_recipe_ingredient.returning ||
            !insert_recipe_ingredient.returning.length
          ) {
            return;
          }

          // get the currently being edited record
          const one = store.readQuery({
            query: RECIPE_QUERY,
            variables: { recipe_id: recipeIngredient.recipe_id }
          });

          if (one && one.recipe && one.recipe.length) {
            // get first object in array
            const recipe = one.recipe[0];

            // get first object return from response
            const response = insert_recipe_ingredient.returning[0];

            // update the Apollo Client cache
            recipe.recipe_ingredients = recipe.recipe_ingredients || [];
            recipe.recipe_ingredients.push({
              id: response.id,
              ingredient_id: response.ingredient_id,
              recipe_id: response.recipe_id,
              quantity: response.quantity,
              comments: response.comments,
              ingredient: response.ingredient
            });

            // notify the store of this new change
            commit('setRecipe', recipe);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });
  },
  async updateRecipe({ dispatch, commit }, recipe) {
    const response = await gqlClient.mutate({
      mutation: RECIPE_UPDATE_MUTATION,
      variables: {
        ...recipe,
        created_by: authService.getUserId()
      },
      update: (store, { data: { update_recipe } }) => {
        // // Read the data from our cache for this query.
        // try {
        //   if (
        //     !insert_recipe_ingredient.returning ||
        //     !insert_recipe_ingredient.returning.length
        //   ) {
        //     return;
        //   }
        //   // get the currently being edited record
        //   const one = store.readQuery({
        //     query: RECIPE_QUERY,
        //     variables: { recipe_id: recipeIngredient.recipe_id }
        //   });
        //   if (one && one.recipe && one.recipe.length) {
        //     // get first object in array
        //     const recipe = one.recipe[0];
        //     // get first object return from response
        //     const response = insert_recipe_ingredient.returning[0];
        //     // update the Apollo Client cache
        //     recipe.recipe_ingredients = recipe.recipe_ingredients || [];
        //     recipe.recipe_ingredients.push({
        //       id: response.id,
        //       ingredient_id: response.ingredient_id,
        //       recipe_id: response.recipe_id,
        //       quantity: response.quantity,
        //       comments: response.comments,
        //       ingredient: response.ingredient
        //     });
        //     // notify the store of this new change
        //     commit('setRecipe', recipe);
        //  }
        // } catch (e) {
        //   console.error(e);
        // }
      }
    });

    window.location.assign('/recipes');
  }
};

const mutations = {
  setRecipeList(state, recipeList) {
    state.all = [...recipeList];
    state.isLoading = false;
  },
  setRecipe(state, recipe) {
    state.one = { ...recipe };
    state.isLoading = false;
  },
  setFoodCategoryList(state, foodCategoryList) {
    state.foodCategoryList = [...foodCategoryList];
  },
  setIngredientList(state, ingredientList) {
    state.ingredientList = [...ingredientList];
  },
  setLoading(state, isLoading) {
    state.isLoading = isLoading;
  }
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
