"use strict";

const JWT = require("jsonwebtoken");
const { asyncHandler } = require("../helper/asyncHandler");
// service
const { findByUserId } = require("../services/keyToken.service");
const { AuthFailureError, NotFoundError } = require("../core/error.response");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
  CLIENT_ID: "x-client-id",
};

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await JWT.sign(payload, publicKey, {
      expiresIn: "2 days",
    });

    const refreshToken = await JWT.sign(payload, privateKey, {
      expiresIn: "7 days",
    });

    // JWT.verify(accessToken, publicKey, (error, decode) => {
    //   if (error) {
    //     console.error(`error verify::`, err);
    //   } else {
    //     console.log(`decode verify::`, decode);
    //   }
    // });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
  }
};

const authentication = asyncHandler(async (req, res, next) => {
  /*
    1 - Check userId missing?
    2 - get accessToken
    3 - verifyToken
    4 - Check user in bds?
    5 - Check keyStore with this userId?
    6 - Ok all => return next()
 */

  const userId = req.headers[HEADER.CLIENT_ID];

  // 1
  if (!userId) throw new AuthFailureError("Invalid Request");

  // 2
  const keyStore = await findByUserId(userId);
  if (!keyStore) throw new NotFoundError("Not found keyStore");

  //3
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError("Invalid Request");
  try {
    const decodeUser = JWT.verify(accessToken, keyStore.publicKey);
    if (userId !== decodeUser.userId)
      throw new AuthFailureError("Invalid UserId");

    req.keyStore = keyStore;
    return next();
  } catch (error) {
    throw error;
  }
});

module.exports = {
  createTokenPair,
  authentication
};
