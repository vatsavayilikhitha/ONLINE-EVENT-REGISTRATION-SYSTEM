export const formatDate = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'TBA';
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  if (!dateString) return 'TBA';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'TBA';
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const isDeadlinePassed = (deadlineString) => {
  if (!deadlineString) return false;
  return new Date() > new Date(deadlineString);
};

export const isEventCompleted = (dateString) => {
  if (!dateString) return false;
  return new Date() > new Date(dateString);
};

export const getDaysRemaining = (deadlineString) => {
  if (!deadlineString) return 0;
  const diffTime = new Date(deadlineString) - new Date();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
};
