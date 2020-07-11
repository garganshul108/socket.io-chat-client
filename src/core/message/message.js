const buildMakeMessage = ({ sanitize }) => {
  const makeMessage = ({ text, senderId, timestamp }) => {
    console.log("Entity: makeMessage called.");

    timestamp = timestamp || new Date().toUTCString;
    if (!text) {
      throw new Error("Text of the message must be provided.");
    }
    if (!senderId) {
      throw new Error("SenderId must be provided.");
    }

    text = sanitize(text);
    return Object.freeze({
      getText: () => text,
      getSenderId: () => senderId,
      getTimestamp: () => timestamp,
    });
  };
  return makeMessage;
};

module.exports = buildMakeMessage;
