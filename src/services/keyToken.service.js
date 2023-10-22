"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
    try {
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // });
      const filter = {
       userId,
      };

      const update = {
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };

      const options = {
        upsert: true,
        new: true,
      };
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new KeyTokenService();
