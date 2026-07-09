import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';
import { createNewPost } from '../api/postApi.js';
import { postsQueryKey } from './usePosts.js';

/**
 * React-query mutation hook for creating a blog post.
 * On success it invalidates the posts cache so the list refetches, and shows
 * a success/error notification. An optional `onSuccess` callback lets the
 * caller (e.g. a form) reset its own state.
 *
 * @param {{ onSuccess?: () => void }} [options]
 */
export const useCreatePost = ({ onSuccess } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNewPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postsQueryKey });
      notifications.show({
        title: 'Post published',
        message: 'Your blog post was added successfully.',
        color: 'green',
      });
      onSuccess?.();
    },
    onError: (mutationError) => {
      notifications.show({
        title: 'Could not publish post',
        message: mutationError.message,
        color: 'red',
      });
    },
  });
};
