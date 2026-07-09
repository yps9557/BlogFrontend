import {
  Box,
  Container,
  Group,
  Title,
  Button,
  ActionIcon,
  Tooltip,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core';

/**
 * Sticky top app bar: brand on the left, a dark-mode toggle and the primary
 * "Write post" call-to-action on the right. Creation is an intentional action,
 * so the CTA lives here rather than as an always-open form.
 *
 * @param {{ onWritePost: () => void }} props
 */
export const AppHeader = ({ onWritePost }) => {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  });
  const isDarkMode = computedColorScheme === 'dark';

  const toggleColorScheme = () =>
    setColorScheme(isDarkMode ? 'light' : 'dark');

  return (
    <Box
      component="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'var(--mantine-color-body)',
        borderBottom: '1px solid var(--mantine-color-default-border)',
      }}
    >
      <Container size="lg" py="sm">
        <Group justify="space-between">
          <Title order={2}>📝 Blog</Title>

          <Group gap="xs">
            <Tooltip label={isDarkMode ? 'Light mode' : 'Dark mode'}>
              <ActionIcon
                variant="default"
                size="lg"
                radius="md"
                aria-label="Toggle color scheme"
                onClick={toggleColorScheme}
              >
                {isDarkMode ? '☀️' : '🌙'}
              </ActionIcon>
            </Tooltip>

            <Button radius="md" onClick={onWritePost}>
              + Write post
            </Button>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};
