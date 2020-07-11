import buildMakeMessage from "./message";

const sanitize = (text) => text;

const makeMessage = buildMakeMessage({ sanitize });

export default makeMessage;
