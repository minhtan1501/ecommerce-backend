"use strict";

const shopModel = require("../models/shop.model");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const KeyTokenService = require("../services/keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};

class AccessService {
  signUp = async ({ name, email, password }) => {
    try {
      // step 1: check email exists;
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxxx",
          message: "Shop already registered!",
        };
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
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log({ privateKey, publicKey });

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop.userId,
          publicKey: publicKey,
        });
        if (publicKeyString) {
          return {
            code: "xxxx",
            message: "publicKeyString error",
          };
        }
        // created token pair
        const token = await createTokenPair(
          { userId: newShop._id, email },
          publicKey,
          privateKey
        );
        if (token) {
          console.log(`Created token success: ${token}`);
        }
        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      } else {
        return {
          code: 200,
          metadata: null,
        };
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

module.exports = new AccessService();
