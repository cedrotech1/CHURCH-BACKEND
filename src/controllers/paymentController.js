const express = require('express');
const PaypackJs = require('paypack-js').default; // Ensure correct import



const paypack = new PaypackJs({
    client_id: process.env.PAYPACK_API_KEY,
    client_secret: process.env.PAYPACK_SECRET
});


export const makePayment = async (req, res) => {
    try {
        const { number, amount, environment } = req.body;
        if (!number) {
            return res.status(400).json({ error: "Missing 'number' parameter" });
        }

        paypack.cashin({ number, amount, environment })
            .then(response => res.json(response.data))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const getCashout = async (req, res) => {
    try {

        if (req.user.role !== "superadmin") {
            return res.status(401).json({
              success: false,
              message: "Not authorized, you are not superadmin",
            });
          }
        const { number, amount, environment } = req.body;
        if (!number) {
            return res.status(400).json({ error: "Missing 'number' parameter" });
        }

        paypack.cashout({ number, amount, environment })
            .then(response => res.json(response.data))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(401).json({
              success: false,
              message: "Not authorized, you are not superadmin",
            });
          }
        let { offset, limit } = req.query;

        offset = parseInt(offset);
        limit = parseInt(limit);

        if (isNaN(offset) || isNaN(limit)) {
            return res.status(400).json({ error: "Invalid offset or limit parameter" });
        }

        paypack.transactions({ offset, limit })
            .then(response => res.json(response.data))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const getEvents = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(401).json({
              success: false,
              message: "Not authorized, you are not superadmin",
            });
          }
        const { offset, limit } = req.query;
        paypack.events({ offset: parseInt(offset), limit: parseInt(limit) })
            .then(response => res.json(response.data))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};

export const getAccount = async (req, res) => {
    try {
        if (req.user.role !== "superadmin") {
            return res.status(401).json({
              success: false,
              message: "Not authorized, you are not superadmin",
            });
          }
        paypack.me()
            .then(response => res.json(response.data))
            .catch(error => res.status(500).json({ error: error.message }));
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: error.message,
        });
    }
};
