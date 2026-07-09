/**
 * Formatting helpers shared across components.
 */

/**
 * Converts an ISO date string into a short relative label ("just now", "3h ago"),
 * falling back to an absolute date for anything older than a week.
 */
export const formatRelativeTime = (isoDateString) => {
  const parsedDate = new Date(isoDateString);
  if (Number.isNaN(parsedDate.getTime())) {
    return '';
  }

  const elapsedSeconds = Math.round((Date.now() - parsedDate.getTime()) / 1000);
  const elapsedMinutes = Math.round(elapsedSeconds / 60);
  const elapsedHours = Math.round(elapsedMinutes / 60);
  const elapsedDays = Math.round(elapsedHours / 24);

  if (elapsedSeconds < 45) return 'just now';
  if (elapsedMinutes < 60) return `${elapsedMinutes}m ago`;
  if (elapsedHours < 24) return `${elapsedHours}h ago`;
  if (elapsedDays < 7) return `${elapsedDays}d ago`;

  return parsedDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Builds up-to-two-letter initials from a name, used for author avatars.
 */
export const getInitials = (fullName) => {
  if (!fullName || typeof fullName !== 'string') {
    return '?';
  }
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);
  if (nameParts.length === 0) {
    return '?';
  }
  return nameParts
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
};
