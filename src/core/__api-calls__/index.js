import axios from "axios";
import config from "../../config/default.json";
import makeCallLogin from "./call-login";
import makeCallPostRoom from "./call-post-room";
import makeCallSignup from "./call-signup";
import makeCallSignIntoRoom from "./call-sign-into-room";

const baseURL = config["api-base-url"];
console.log(__dirname, __filename, "BASEURL", baseURL);

const callLogin = makeCallLogin({
  ENDPOINT: `${baseURL}/login`,
  httpService: axios,
});

const callSignup = makeCallSignup({
  ENDPOINT: `${baseURL}/signup`,
  httpService: axios,
});

const callPostRoom = makeCallPostRoom({
  ENDPOINT: `${baseURL}/room`,
  httpService: axios,
});

const callSignIntoRoom = makeCallSignIntoRoom({
  ENDPOINT: `${baseURL}/room/signin`,
  httpService: axios,
});

// axios.interceptors.response.use(null, (error) => {
//   const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status < 500;

//   if (!expectedError) {
//     console.log(error);
//     toast.error("Unexpected error occurred");
//   }

//   return Promise.reject(error);
// });

export { callLogin, callPostRoom, callSignIntoRoom, callSignup };
