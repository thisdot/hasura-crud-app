import { router } from '@/router';
import gqlClient from '@/apollo';
import gql from 'graphql-tag';

import { RECIPES_QUERY } from '@/queries';

const state = {
    all: []
};

const actions = {
    async fetch({ commit }) {
        const response = await gqlClient.query({
          query: RECIPES_QUERY
        });

        commit("setRecipes", response.data.recipe);
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
