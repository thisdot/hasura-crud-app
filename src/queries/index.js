import gql from 'graphql-tag';

export const RECIPES_QUERY = gql`
    query {
        recipe {
            id
            name
        }
    }
`;