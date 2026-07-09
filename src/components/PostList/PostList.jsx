import { useState } from 'react';
import {
  SimpleGrid,
  Card,
  Skeleton,
  Alert,
  Button,
  Center,
  Stack,
  Text,
  Group,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { usePosts } from '../../hooks/usePosts.js';
import { PostCard } from '../PostCard/PostCard.jsx';
import { PostReaderModal } from '../PostReaderModal/PostReaderModal.jsx';

/** Responsive column configuration reused by the grid and the skeletons. */
const gridColumns = { base: 1, sm: 2, lg: 3 };

/** Placeholder card shown while posts are loading — mirrors the real layout. */
const PostCardSkeleton = () => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Stack gap="sm">
      <Skeleton height={20} width="80%" radius="sm" />
      <Skeleton height={12} radius="sm" />
      <Skeleton height={12} radius="sm" />
      <Skeleton height={12} width="60%" radius="sm" />
      <Group gap="sm" mt="xs">
        <Skeleton height={28} circle />
        <Skeleton height={12} width={120} radius="sm" />
      </Group>
    </Stack>
  </Card>
);

/**
 * Fetches and renders the list of blog posts in a responsive grid.
 * Handles the loading (skeletons), error (retry) and empty states so the page
 * component stays focused on layout.
 */
export const PostList = () => {
  const { data: postList, isLoading, isError, error, refetch, isFetching } =
    usePosts();
  const isMobile = useMediaQuery('(max-width: 48em)');

  // The post currently open in the reader modal (null when closed).
  const [selectedPost, setSelectedPost] = useState(null);

  if (isLoading) {
    return (
      <SimpleGrid cols={gridColumns} spacing="lg">
        {Array.from({ length: 6 }).map((_unused, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </SimpleGrid>
    );
  }

  if (isError) {
    return (
      <Alert color="red" title="Failed to load posts" variant="light">
        <Stack gap="sm" align="flex-start">
          <Text size="sm">
            {error?.message || 'Something went wrong while loading posts.'}
          </Text>
          <Button
            size="xs"
            variant="white"
            color="red"
            loading={isFetching}
            onClick={() => refetch()}
          >
            Try again
          </Button>
        </Stack>
      </Alert>
    );
  }

  if (!postList || postList.length === 0) {
    return (
      <Center py="xl">
        <Stack align="center" gap={4}>
          <Text fz={40}>📭</Text>
          <Text fw={600}>No posts yet</Text>
          <Text c="dimmed" size="sm" ta="center">
            Be the first to publish a blog post using “Write post”.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <>
      <SimpleGrid cols={gridColumns} spacing="lg">
        {postList.map((post) => (
          <PostCard key={post.id} post={post} onRead={setSelectedPost} />
        ))}
      </SimpleGrid>

      <PostReaderModal
        post={selectedPost}
        opened={selectedPost !== null}
        onClose={() => setSelectedPost(null)}
        fullScreen={isMobile}
      />
    </>
  );
};
