import { router } from '@/router';
import gqlClient from '@/services/apollo';
import gql from 'graphql-tag';

import {
  RECIPES_QUERY,
  RECIPE_QUERY,
  FOOD_CATEGORY_RECIPE,
  INGREDIENTS
} from '@/queries';

const state = {
  all: [],
  one: {},
  foodCategoryList: [],
  ingredientList: [],
  isLoading: false
};

const actions = {
  async findAll({ commit }) {
    // commit('setRecipes', [
    //   {
    //     id: 1,
    //     name: 'Recipe #1',
    //     description:
    //       'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
    //     number_of_servings: 4,
    //     calories_per_serving: 200
    //   },
    //   {
    //     id: 2,
    //     name: 'Recipe #2',
    //     description:
    //       'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
    //     number_of_servings: 4,
    //     calories_per_serving: 200
    //   },
    //   {
    //     id: 3,
    //     name: 'Recipe #3',
    //     description:
    //       'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food',
    //     number_of_servings: 4,
    //     calories_per_serving: 200
    //   },
    //   {
    //     id: 4,
    //     name: 'Recipe #4',
    //     description:
    //       'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
    //     number_of_servings: 4,
    //     calories_per_serving: 200
    //   },
    //   {
    //     id: 5,
    //     name: 'Recipe #5',
    //     description:
    //       'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
    //     number_of_servings: 4,
    //     calories_per_serving: 200
    //   }
    // ]);
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
      variables: { recipeId: recipeId }
    });
    commit('setRecipe', response.data.recipe[0]);
  },
  async fetchFoodCategoryList({ commit }) {
    const response = await gqlClient.query({ query: FOOD_CATEGORY_RECIPE });
    commit('setFoodCategoryList', response.data.food_category);
  },
  async fetchIngredientList({ commit }) {
    const response = await gqlClient.query({ query: INGREDIENTS });
    commit('setIngredientList', response.data.ingredient);
  }
};

const mutations = {
  setRecipeList(state, recipeList) {
    state.all = recipeList;
    state.isLoading = false;
  },
  setRecipe(state, recipe) {
    state.one = recipe;
    state.isLoading = false;
  },
  setFoodCategoryList(state, foodCategoryList) {
    state.foodCategoryList = foodCategoryList;
  },
  setIngredientList(state, ingredientList) {
    state.ingredientList = ingredientList;
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
