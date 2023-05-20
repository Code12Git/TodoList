export const createError = async (status, message) => {
  const error = new Error(message);
  error.status = status;
  error.message = message;
  throw error;
};
