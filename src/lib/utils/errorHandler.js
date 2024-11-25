export const handleError = (error) => {
  let message = "Un error inesperado ha ocurrido";

  if (error.response) {
    const { data } = error.response;

    if (data.errors) {
      message = data.errors[0];
    } else {
      message = data.message;
    }
  } else if (error.request) {
    message = "No se pudo conectar con el servidor";
  } else {
    message = error.message;
  }

  return message;
};
