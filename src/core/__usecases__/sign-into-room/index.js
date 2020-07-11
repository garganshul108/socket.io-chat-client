import makeSignIntoRoom from "./sign-into-room";
import { callSignIntoRoom } from "../../__api-calls__";

const signIntoRoom = makeSignIntoRoom({ callSignIntoRoom });

export default signIntoRoom;
