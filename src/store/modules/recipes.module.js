import { router } from '@/router';
import gqlClient from '@/apollo';
import gql from 'graphql-tag';

const state = {
    recipes: []
};

const actions = {
    async fetch({ commit }) {
        const response = await gqlClient.query({
            query: gql`
                {
                    recipe {
                        id
                        name
                    }
                }
            `,
        });

        commit("setRecipes", response.data.recipe);
    }
};

const mutations = {
    setRecipes(state, recipes) {
        state = { recipes: recipes };
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
