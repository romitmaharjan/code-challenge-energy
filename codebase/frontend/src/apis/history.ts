export const getPaymentHistory = async () => {
  try {
    const response = await fetch(
      `/api/history`,
    {
      method: "GET"
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching account:", error);
  }
};