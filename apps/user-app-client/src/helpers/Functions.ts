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
    throw Error("Otp Api Failed");
  }
};

export const signUp = (phoneNumber:string, password:string) => {
  let data = JSON.stringify({
    phoneNumber,
    password
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "http://localhost:3001/api/auth/signup",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios
    .request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signInFnc = (phoneNumber:string, password:string) => {
  // const axios = require('axios');
  // signIn("credentials", { phoneNumber, password })
// let data = JSON.stringify({
//   phoneNumber,
//   password
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'http://localhost:3001/api/auth/signin',
//   headers: { 
//     'Content-Type': 'application/json', 
//     'Cookie': 'next-auth.callback-url=http%3A%2F%2Flocalhost%3A3001; next-auth.csrf-token=1426f4fc79e3712d285b1a3deed8c0ebde1ed24ac92562a9fa6fcc2f118c0c24%7C649de0db5e4e2708ea06dd5459c7cac35f6b6c54d23ec0a5d20e719fa86d26c5'
//   },
//   data : data
// };

// axios.request(config)
// .then((response:any) => {
//   console.log(JSON.stringify(response.data));
// })
// .catch((error:any) => {
//   console.log(error);
// });

}