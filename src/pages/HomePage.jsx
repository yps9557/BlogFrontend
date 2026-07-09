import {
  Container,
  Title,
  Text,
  Stack,
  Group,
  Badge,
  Drawer,
  Button,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { AppHeader } from '../components/AppHeader/AppHeader.jsx';
import { AddPostForm } from '../components/AddPostForm/AddPostForm.jsx';
import { PostList } from '../components/PostList/PostList.jsx';
import { usePosts } from '../hooks/usePosts.js';

/**
 * Home page: a feed-first blog view.
 * Reading the feed is the primary task, so it fills the page; creating a post
 * is an intentional action behind the "Write post" button, which opens a modal
 * (full-screen on mobile for a drawer-like experience).
 */
export const HomePage = () => {
  const [isFormOpen, { open: openForm, close: closeForm }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 48em)');
  const { data: postList } = usePosts();

  const postCount = postList?.length ?? 0;

  return (
    <>
      <AppHeader onWritePost={openForm} />

      <Container size="lg" py="xl">
        <Stack gap="lg">
          <Group justify="space-between" align="center" wrap="wrap">
            <Stack gap={2}>
              <Title order={2}>Latest posts</Title>
              <Text c="dimmed" size="sm">
                Read the latest posts or share your own.
              </Text>
            </Stack>
            {postCount > 0 && (
              <Badge size="lg" variant="light" radius="sm">
                {postCount} {postCount === 1 ? 'post' : 'posts'}
              </Badge>
            )}
          </Group>

          <PostList />
        </Stack>
      </Container>

      {/* Floating CTA for mobile, where the header button may scroll away. */}
      {isMobile && (
        <Button
          onClick={openForm}
          radius="xl"
          size="md"
          style={{
            position: 'fixed',
            right: 16,
            bottom: 16,
            zIndex: 200,
            boxShadow: 'var(--mantine-shadow-lg)',
          }}
        >
          + Write
        </Button>
      )}

      <Drawer
        opened={isFormOpen}
        onClose={closeForm}
        position="right"
        title="Write a new post"
        size={isMobile ? '100%' : 'md'}
        padding="lg"
        overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
      >
        <AddPostForm onSuccess={closeForm} onCancel={closeForm} />
      </Drawer>
    </>
  );
};
