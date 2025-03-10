// "use client"; // Ensure this runs on the client side

// import { useGetUserQuery } from "@/redux/features/auth/authApi";
// import { useEffect, useState } from "react";

// export function useAuthTokens() {
//   const [accessToken, setAccessToken] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchToken = async () => {
//       const response = await useGetUserQuery(undefined);
//       console.log(response);
//       setAccessToken(response.data?.accessToken);
//     };

//     fetchToken();
//   }, []);

//   return { accessToken };
// }
