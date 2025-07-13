"use strict";

// Gerekli bağımlılıklar
const jwt = require("jsonwebtoken");
const checkUserAndSetToken = require("../helpers/checkUserAndSetToken");

module.exports = {
  // 🚪 Kullanıcı Girişi
  login: async (req, res, next) => {
    try {
      const checkUser = await checkUserAndSetToken(req.body);

      if (checkUser.error) {
        return res.status(401).json({ error: true, message: checkUser.message });
      }

      return res.status(200).json(checkUser);
    } catch (err) {
      next(err);
    }
  },

  // ♻️ Refresh Token ile Yeni Access Token Al
  refresh: async (req, res, next) => {
    const refreshToken = req.body?.token?.refresh;

    if (!refreshToken) {
      return res.status(401).json({ error: true, message: "Please provide token.refresh" });
    }

    try {
      const jwtData = jwt.verify(refreshToken, process.env.REFRESH_KEY, {
        algorithms: ["HS256"],
      });

      if (!jwtData) {
        return res.status(401).json({ error: true, message: "Invalid refresh token payload" });
      }

      const checkUser = await checkUserAndSetToken(jwtData, false);

      if (checkUser.error) {
        return res.status(401).json({ error: true, message: checkUser.message });
      }

      return res.status(200).json(checkUser);
    } catch (err) {
      next(err);
    }
  },

  // 🚫 Logout (İsteğe bağlı Redis entegrasyonu eklenebilir)
  logout: async (req, res) => {
    return res.status(200).json({
      error: false,
      message:
        "No server-side logout needed. Just delete your access token on client side.",
    });
  },
};