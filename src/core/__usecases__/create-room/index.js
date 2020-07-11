import makeCreateRoom from "./create-room";
import { callPostRoom } from "../../__api-calls__";

const createRoom = makeCreateRoom({ callPostRoom });

export default createRoom;
