import axios from "axios";
import axiosInstance from "./axiosIntercepter";
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
    const response = await axiosInstance.request(config);
    // console.log(JSON.stringify(response.data));
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
    result = await axiosInstance.request(config);
    return result?.data;
  } catch (e:any) {
    console.warn(e);
    throw Error(e?.response?.data?.msg || "server error");
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
    result = await axiosInstance.request(config);
    return result?.data;
  } catch (e:any) {
    console.warn(e);
    throw Error(e?.response?.data?.msg || " server error");
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

    const result = await axiosInstance.request(config);
    return result?.data
  } catch (e) {
    console.warn(e);
    return null;
  }
};

export const getOnRampTransactions = async() => {
  const config = {
    method:'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:7000/api/v1/onRampTransactions',
    headers: {
      "Content-Type": "application/json",
    }
  }

  try {
    const response = await axiosInstance.request(config);
    // console.log(response);
    return response?.data;
  } catch(e:any) {
    throw Error(e?.response?.data?.msg || " server error");
  }
}

export const getBalance = async() => {
  const config = {
    method:'get',
    maxBodyLength: Infinity,
    url: 'http://localhost:7000/api/v1/Balance',
    headers: {
      "Content-Type": "application/json",
    }
  }

  try {
    const response = await axiosInstance.request(config);
    // console.log(response);
    return response?.data;
  } catch(e:any) {
    throw Error(e?.response?.data?.msg || "server error");
  }
}


