import { Card, Text, Title, Avatar, Group, Stack } from '@mantine/core';
import { formatRelativeTime, getInitials } from '../../utils/format.js';
import classes from './PostCard.module.css';

/**
 * Presentational card for a single blog post.
 * Shows a clamped title, a 3-line excerpt of the content, and a meta row with
 * the author's avatar/initials and a relative timestamp.
 *
 * Clicking (or pressing Enter/Space on) the card opens the full-post reader.
 *
 * @param {{
 *   post: { title: string, content: string, author: string, createdAt: string },
 *   onRead: (post: object) => void,
 * }} props
 */
export const PostCard = ({ post, onRead }) => {
  const handleReadPost = () => onRead(post);

  const handleKeyDown = (keyboardEvent) => {
    if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
      keyboardEvent.preventDefault();
      handleReadPost();
    }
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      className={classes.card}
      role="button"
      tabIndex={0}
      aria-label={`Read full post: ${post.title}`}
      onClick={handleReadPost}
      onKeyDown={handleKeyDown}
    >
      <Stack gap="sm" h="100%" justify="space-between">
      <Stack gap="xs">
        <Title order={3} lineClamp={2}>
          {post.title}
        </Title>

        <Text size="sm" c="dimmed" lineClamp={3}>
          {post.content}
        </Text>

        <Group gap={4} align="center">
          <Text size="sm" c="blue" fw={500}>
            Read more
          </Text>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--mantine-color-blue-6)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Group>
      </Stack>

      <Group gap="sm" wrap="nowrap" mt="xs">
        <Avatar color="blue" radius="xl" size="sm">
          {getInitials(post.author)}
        </Avatar>
        <Group gap={6} wrap="nowrap">
          <Text size="sm" fw={500}>
            {post.author}
          </Text>
          <Text size="sm" c="dimmed">
            · {formatRelativeTime(post.createdAt)}
          </Text>
        </Group>
      </Group>
      </Stack>
    </Card>
  );
};
