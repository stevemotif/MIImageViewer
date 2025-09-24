export async function fetchClientSecret(scan, date, time, email) {
  try {
    const response = await fetch('/account/api/checkoutsession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      scan,
      date,
      time,
      email,
    }),
  });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched session clientSecret:", data);

    return data.clientSecret;
  } catch (error) {
    console.error("Error fetching client secret:", error);
    return null;
  }
}
