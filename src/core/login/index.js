import buildMakeLogin from "./login";

const hashPassword = (text) => text;
const santizeText = (text) => text;
const makeLogin = buildMakeLogin({ hashPassword, santizeText });

export default makeLogin;
