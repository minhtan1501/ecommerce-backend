"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  createKeyToken = async ({ userId, publicKey }) => {
    try {
      // convert buffer to string
      const publicKeyString = publicKey.toString();
      console.log("publicKey",userId);
      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });
      console.log(tokens);
      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new KeyTokenService();
