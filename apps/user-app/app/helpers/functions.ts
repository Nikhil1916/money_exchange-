import axios from "axios";

export const callOtp = async (phoneNumber: string) => {
  let data = JSON.stringify({
    phoneNumber: phoneNumber,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/api/send-otp",
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
    throw Error("Otp Api Failed")
  }
};
