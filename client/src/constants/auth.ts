export const getAuthData = () => {
  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");
  return { token, email };
};
