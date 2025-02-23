const { apiKey } = require("../auth/checkAuth");
const AccessService = require("../services/access.service");
const express = require("express");

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`[P]:: signUp::`, req.body);
            // Gọi AccessService.signUp đúng cách
            const result = await AccessService.signUp(req.body);
            return res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AccessController();
