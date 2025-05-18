export const getEnergyAccount = async () => {
  try {
    const response = await fetch(
      `/api/energy-accounts`,
    {
      method: "GET"
    });
    return response.json();
  } catch (error) {
    console.error("Error fetching account:", error);
  }
};
