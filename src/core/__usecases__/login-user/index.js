import makeLoginUser from "./login-user";
import { callLogin } from "../../__api-calls__";

const loginUser = makeLoginUser({ callLogin });

export default loginUser;
