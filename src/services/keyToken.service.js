"use strict";

const keyTokenModel = require("../models/keyToken.model");

class KeyTokenService {
  createKeyToken = async ({ userId, publicKey, privateKey }) => {
    try {

      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // });
      const filter = {
        user: userId,
        }, update = {
          
        }
      }
      const tokens = await keyTokenModel.findOneAndUpdate(filter,update,options)

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new KeyTokenService();
