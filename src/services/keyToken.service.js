"use strict";

const keyTokenModel = require("../models/keyToken.model");
const { Types } = require("mongoose");
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

  findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ userId: userId }).lean();
  };

  removeKeyById = async (id) => {
    return await keyTokenModel.findByIdAndDelete(id);
  };
}

module.exports = new KeyTokenService();
