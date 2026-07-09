import { graphqlRequest } from './axiosClient.js';

/**
 * GraphQL operation strings kept together so the API surface is easy to find.
 */
const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      id
      title
      content
      author
      createdAt
    }
  }
`;

const CREATE_POST_MUTATION = `
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      id
      title
      content
      author
      createdAt
    }
  }
`;

/**
 * Fetches all blog posts.
 * @returns {Promise<Array>} List of posts.
 */
export const getAllPosts = async () => {
  const responseData = await graphqlRequest(GET_POSTS_QUERY);
  return responseData.posts;
};

/**
 * Creates a new blog post.
 * @param {{ title: string, content: string, author?: string }} postInput
 * @returns {Promise<object>} The newly created post.
 */
export const createNewPost = async (postInput) => {
  const responseData = await graphqlRequest(CREATE_POST_MUTATION, {
    input: postInput,
  });
  return responseData.createPost;
};
