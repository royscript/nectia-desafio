export const cambiarToken = (token) => {
    return {
      type: "cambiarToken",
      payload: token,
    };
  };