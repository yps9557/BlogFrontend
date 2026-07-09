import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Stack, Group } from '@mantine/core';
import { useCreatePost } from '../../hooks/useCreatePost.js';

const TITLE_MAX_LENGTH = 150;

/**
 * Form for creating a new blog post, designed to live inside a modal/drawer.
 * Uses Mantine's `useForm` for client-side validation and the `useCreatePost`
 * mutation hook to persist the post. Resets and closes on a successful submit.
 *
 * @param {{ onSuccess?: () => void, onCancel?: () => void }} props
 */
export const AddPostForm = ({ onSuccess, onCancel }) => {
  const postForm = useForm({
    initialValues: {
      title: '',
      author: '',
      content: '',
    },
    validate: {
      title: (value) =>
        value.trim().length < 3 ? 'Title must be at least 3 characters long' : null,
      content: (value) =>
        value.trim().length < 10
          ? 'Content must be at least 10 characters long'
          : null,
    },
  });

  const { mutate: submitNewPost, isPending } = useCreatePost({
    onSuccess: () => {
      postForm.reset();
      onSuccess?.();
    },
  });

  const handleFormSubmit = postForm.onSubmit((formValues) => {
    submitNewPost({
      title: formValues.title.trim(),
      content: formValues.content.trim(),
      author: formValues.author.trim() || undefined,
    });
  });

  const titleLength = postForm.values.title.length;
  const contentLength = postForm.values.content.length;

  return (
    <form onSubmit={handleFormSubmit}>
      <Stack gap="md">
        <TextInput
          label="Title"
          placeholder="An interesting title"
          withAsterisk
          maxLength={TITLE_MAX_LENGTH}
          data-autofocus
          description={`${titleLength}/${TITLE_MAX_LENGTH}`}
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          {...postForm.getInputProps('title')}
        />

        <TextInput
          label="Author"
          placeholder="Your name (optional)"
          {...postForm.getInputProps('author')}
        />

        <Textarea
          label="Content"
          placeholder="Write your blog post here..."
          autosize
          minRows={5}
          maxRows={12}
          withAsterisk
          description={`${contentLength} characters`}
          inputWrapperOrder={['label', 'input', 'description', 'error']}
          {...postForm.getInputProps('content')}
        />

        <Group justify="flex-end" mt="xs">
          {onCancel && (
            <Button variant="default" onClick={onCancel} disabled={isPending}>
              Cancel
            </Button>
          )}
          <Button type="submit" loading={isPending}>
            Publish post
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
