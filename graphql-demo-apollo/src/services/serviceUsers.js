import {ValidationError, AuthenticationError} from 'apollo-server-express';
import {hasOneOfRoles, isAdmin} from "../auth/checkAuth";
import jwt from "jsonwebtoken";

const createToken = async (user, secret, expiresIn) => {
    return await jwt.sign({user_id: user.id}, secret, {expiresIn});
};

export default {
    ///////////////////////////////////////////
    // WHOAMI
    ///////////////////////////////////////////
    whoami: async ({}, {me}) => {
        return me;
    },

    ///////////////////////////////////////////
    // QUERY USERS
    ///////////////////////////////////////////
    users: async ({}, {me}) => {
        isAdmin(me);
        return await models.User.findAll()
    },

    findUser: async ({id, name}, {me}) => {
        if(id !== undefined)
            return await models.User.findByPk(id);
        else if(name !== undefined)
            return await models.User.findOne({where:{name:name}});
        else
            throw new ValidationError(`Parameter 'id' or 'name' must be set`);
    },

    ///////////////////////////////////////////
    // CHANGE USERS
    ///////////////////////////////////////////
    signUp: async ({name, login, password}, {me}) => {
        const user = await models.User.create({name: name, login: login, password: password, roles: 'users'});
        const token = await createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
        return {token: token};
    },

    setUserRoles: async ({login, roles}, {me}) => {
        isAdmin(me);
        const user = await models.User.findOne({where: {login: login}});
        if (!user)
            throw new ValidationError(`User with login=${login} not found`)
        await user.update({roles: roles});
        return await models.User.findOne({where: {login: login}});
    },

    signIn: async ({login, password}, {me}) => {
        const user = await models.User.findOne({where:{login:login}});
        if(!user)
            throw new AuthenticationError(`User with login=${login} not found`)
        const isValid = await user.validatePassword(password);
        if(!isValid)
            throw new AuthenticationError(`Invalid password`)
        const token = await createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
        return {token: token};
    }

}