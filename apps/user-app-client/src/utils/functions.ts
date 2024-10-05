import axios from "axios";
export const callOtp = async (phoneNumber: string) => {
  const data = JSON.stringify({
    phoneNumber: phoneNumber,
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:7000/api/v1/send-otp",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    console.log(JSON.stringify(response.data));
    return response?.data?.code;
  } catch (error) {
    console.error(error);
    throw Error("Otp Api Failed");
  }
};
interface SignUpResponse {
  id: number;
  token: string;
}

export const signUp = async (
  phoneNumber: string,
  password: string
): Promise<SignUpResponse | null | undefined> => {
  const data = JSON.stringify({
    phoneNumber,
    password,
  });
  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:7000/api/v1/user/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let result;
  try {
    result = await axios.request(config);
    return result?.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
};
export const signInFnc = async (
  phoneNumber: string,
  password: string
): Promise<SignUpResponse | null | undefined> => {
  const data = JSON.stringify({
    phoneNumber,
    password,
  });

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:7000/api/v1/user/signin",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };
  let result;
  try {
    result = await axios.request(config);
    return result?.data;
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const isUserLoggedInFnc = async (token: string) => {
  try {
    const data = JSON.stringify({
      token,
    });

    const config = {
      method: "post",
      maxBoyLength: Infinity,
      url: "http://localhost:7000/api/v1/user/isSignedin",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    const result = await axios.request(config);
    return result?.data
  } catch (e) {
    console.warn(e);
    return null;
  }
};
