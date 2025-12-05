import User from '../models/userModel.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

let mgmtToken = null;
let tokenExpiry = 0;

async function getManagementToken() {
    const now = Math.floor(Date.now() / 1000);
    if (mgmtToken && now < tokenExpiry - 60) {
        return mgmtToken;
    }

    const res = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://','')}/oauth/token`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            client_id: process.env.MGMT_CLIENT_ID,
            client_secret: process.env.MGMT_CLIENT_SECRET,
            audience: `https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://','')}/api/v2/`,
            grant_type: 'client_credentials'
        })
    });
    const data = await res.json();
    mgmtToken = data.access_token;
    tokenExpiry = now + data.expires_in-60;
    return mgmtToken;
}

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUserByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req,res) => {
    try {
        const token = await getManagementToken();
        const {email, password, username, name, favorites} = req.body;

        const response = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL.replace('https://','')}/api/v2/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                email,
                password,
                username,
                name,
                favorites: favorites ? favorites : [],
                connection: 'Username-Password-Authentication'
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            return res.status(response.status).json({ message: errorData.message });
        }
        else {
            const authData = await response.json();
            const newUser = new User({
                OAuth: authData.user_id,
                name,
                email,
                username,
                favorites: favorites ? favorites : []
            });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const username = req.params.username;
        const updatedUser = await User.findOneAndUpdate({ username }, req.body, { new: true });
        if (updatedUser) {
            res.status(200).json(updatedUser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const username = req.params.username;
        const deletedUser = await User.findOneAndDelete({ username });
        if (deletedUser) {
            res.status(200).json({ message: 'User deleted successfully' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export { getUsers, getUserByUsername, createUser, updateUser, deleteUser };