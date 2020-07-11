import buildMakeRoom from "./room";

const santize = (text) => text;
const makeRoom = buildMakeRoom({ santize });

export default makeRoom;
