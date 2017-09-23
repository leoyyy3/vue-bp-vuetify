const express = require('express');
const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if(token) {
        jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json({message: 'Authentication failed'});
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({message: 'Authentication failed'});
    }
}