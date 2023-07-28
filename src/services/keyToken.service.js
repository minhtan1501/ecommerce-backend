"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  createKeyToken = async ({ userId, publicKey }) => {
    try {
      // convert buffer to string
      const publicKeyString = publicKey.toString();

      const tokens = await keyTokenModel.create({
        user: userId,
        publicKey: publicKeyString,
      });

      return tokens ? publicKeyString : null;
    } catch (error) {}
  };
}

module.exports = new KeyTokenService();
