// User registration function
export const registerUser = async (data: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_BASE_URL is not defined");
    }
    const response = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // If using cookies or authentication
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    return await response.json(); // Return registration response
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during registration");
  }
};

// user login function
export const loginUser = async (email: string, password: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    console.log("baseUrl", baseUrl);
    if (!baseUrl) {
      throw new Error("NEXT_BASE_URL is not defined");
    }
    const response = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // If using cookies or authentication
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    return await response.json(); // Return the login response
  } catch (error: any) {
    throw new Error(error.message || "An error occurred during login");
  }
};
