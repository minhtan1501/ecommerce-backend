"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");
const { BadRequestError } = require("../core/error.response");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  signUp = async ({ name, email, password }) => {
      // step 1: check email exists;
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
       throw new BadRequestError("Error: Shop already register")
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newShop = await shopModel.create({
        name,
        email,
        password: passwordHash,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // created privateKey, publicKey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        //   privateKeyEncoding: {
        //     type: "pkcs1",
        //     format: "pem",
        //   },
        // });
        const privateKey = crypto.randomBytes(64).toString("hex");
        const publicKey = crypto.randomBytes(64).toString("hex");
        // pkcs1 = public key CryptoGraphy standards

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        });
        if (!keyStore) {
          throw new BadRequestError("KeyStore error");
          // return {
          //   code: "xxxx",
          //   message: "publicKeyString error",
          // };
        }
       
        // created token pair
        const tokens = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        if (tokens) {
          console.log(`Created token success: ${tokens}`);
        }
        return {
          code: 201,
          metadata: {
            shop: getIntoData({
              fields: ["_id", "email", "name"],
              object: newShop,
            }),
            tokens,
          },
        };
      } else {
        return {
          code: 200,
          metadata: null,
        };
      }
  };
}

module.exports = new AccessService();
