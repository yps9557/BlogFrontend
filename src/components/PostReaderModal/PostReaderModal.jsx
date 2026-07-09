import { Modal, Group, Avatar, Text, Stack, Divider } from '@mantine/core';
import { formatRelativeTime, getInitials } from '../../utils/format.js';

/**
 * Full-post reader shown when a card is clicked.
 * The list already holds the full `content`, so no extra fetch is needed — the
 * modal simply renders the complete post with its meta and scrolls if long.
 *
 * @param {{
 *   post: object | null,
 *   opened: boolean,
 *   onClose: () => void,
 *   fullScreen?: boolean,
 * }} props
 */
export const PostReaderModal = ({ post, opened, onClose, fullScreen = false }) => (
  <Modal
    opened={opened}
    onClose={onClose}
    size="lg"
    centered
    padding="xl"
    radius="md"
    fullScreen={fullScreen}
    overlayProps={{ backgroundOpacity: 0.55, blur: 3 }}
    title={post?.title}
    styles={{
      title: {
        fontSize: 'var(--mantine-font-size-xl)',
        fontWeight: 700,
        lineHeight: 1.3,
        paddingRight: 'var(--mantine-spacing-md)',
      },
      header: { alignItems: 'flex-start', marginBottom: 'var(--mantine-spacing-xs)' },
    }}
  >
    {post && (
      <Stack gap="md" mt="xs">
        <Group gap="sm" wrap="nowrap">
          <Avatar color="blue" radius="xl" size="md">
            {getInitials(post.author)}
          </Avatar>
          <div>
            <Text size="sm" fw={500}>
              {post.author}
            </Text>
            <Text size="xs" c="dimmed">
              {formatRelativeTime(post.createdAt)}
            </Text>
          </div>
        </Group>

        <Divider />

        <Text style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {post.content}
        </Text>
      </Stack>
    )}
  </Modal>
);
