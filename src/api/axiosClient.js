import axios from 'axios';

const graphqlEndpoint =
  import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql';

/**
 * Pre-configured axios instance pointed at the GraphQL endpoint.
 * GraphQL over HTTP is just a POST with a `{ query, variables }` body, so a
 * single axios client is all we need.
 */
export const axiosClient = axios.create({
  baseURL: graphqlEndpoint,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Sends a GraphQL request and unwraps the response.
 * Throws a normal `Error` (with a readable message) when the API returns
 * GraphQL errors, so react-query can move the query/mutation into its error
 * state.
 *
 * @param {string} query - GraphQL query or mutation string.
 * @param {object} [variables] - Variables for the operation.
 * @returns {Promise<object>} The `data` portion of the GraphQL response.
 */
export const graphqlRequest = async (query, variables = {}) => {
  const { data: responseBody } = await axiosClient.post('', { query, variables });

  if (responseBody.errors && responseBody.errors.length > 0) {
    const combinedMessage = responseBody.errors
      .map((graphqlError) => graphqlError.message)
      .join(' ');
    throw new Error(combinedMessage);
  }

  return responseBody.data;
};
