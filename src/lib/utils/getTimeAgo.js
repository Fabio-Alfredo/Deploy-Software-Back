export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInMinutes = Math.floor(diffInMs / 60000);

  if (diffInMinutes < 1) return "hace menos de un minuto";
  if (diffInMinutes === 1) return "hace 1 minuto";
  if (diffInMinutes < 60) return `hace ${diffInMinutes} minutos`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours === 1) return "hace 1 hora";
  if (diffInHours < 24) return `hace ${diffInHours} horas`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return "hace 1 día";
  if (diffInDays < 7) return `hace ${diffInDays} días`;
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks === 1) return "hace 1 semana";
  return `hace ${diffInWeeks} semanas`;
};
