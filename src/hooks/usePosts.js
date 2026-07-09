import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/postApi.js';

/** Shared query key so queries and cache invalidation stay in sync. */
export const postsQueryKey = ['posts'];

/**
 * React-query hook that fetches and caches the list of blog posts.
 * Exposes the standard react-query result (data, isLoading, isError, etc.).
 */
export const usePosts = () =>
  useQuery({
    queryKey: postsQueryKey,
    queryFn: getAllPosts,
  });
