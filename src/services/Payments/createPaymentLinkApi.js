export async function createPaymentLinkApi({ description, amount }) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.userId) throw new Error("User not logged in");

    const response = await fetch("https://localhost:7056/api/Payment/create-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.userId,
        description,
        amount,
      }),
    });

    if (!response.ok) {
      let errorMessage = `Create payment link failed (Status ${response.status})`;
      try {
        const errorData = await response.json();
        if (errorData?.message) errorMessage = errorData.message;
      } catch {
        console.warn("No JSON in error body");
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data.paymentUrl;
  } catch (error) {
    console.error("CreatePaymentLink API error:", error);
    throw error;
  }
}
