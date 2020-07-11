import buildMakeSignup from "./signup";

const hashPassword = (text) => text;
const santizeText = (text) => text;
const makeSignup = buildMakeSignup({ hashPassword, santizeText });

export default makeSignup;
