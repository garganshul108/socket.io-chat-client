import makeSignupUser from "./signup-user";
import { callSignup } from "../../__api-calls__";

const signupUser = makeSignupUser({ callSignup });

export default signupUser;
