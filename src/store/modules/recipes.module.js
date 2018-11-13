import { router } from '@/router';
import gqlClient from '@/services/apollo';
import gql from 'graphql-tag';

import { RECIPES_QUERY } from '@/queries';

const state = {
  all: []
};

const actions = {
  async fetch({ commit }) {
    commit('setRecipes', [
      {
        id: 1,
        name: 'Recipe #1',
        description:
          'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
        number_of_servings: 4,
        calories_per_serving: 200
      },
      {
        id: 2,
        name: 'Recipe #2',
        description:
          'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
        number_of_servings: 4,
        calories_per_serving: 200
      },
      {
        id: 3,
        name: 'Recipe #3',
        description:
          'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food',
        number_of_servings: 4,
        calories_per_serving: 200
      },
      {
        id: 4,
        name: 'Recipe #4',
        description:
          'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
        number_of_servings: 4,
        calories_per_serving: 200
      },
      {
        id: 5,
        name: 'Recipe #5',
        description:
          'Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food Recipe Food ',
        number_of_servings: 4,
        calories_per_serving: 200
      }
    ]);
    // const response = await gqlClient.query({
    //   query: RECIPES_QUERY
    // });
    //commit('setRecipes', response.data.recipe);
  }
};

const mutations = {
  setRecipes(state, recipes) {
    state.all = recipes;
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
