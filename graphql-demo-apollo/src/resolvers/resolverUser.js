import {combineResolvers} from 'graphql-resolvers';
import {isAdmin} from './authorization';
import {ValidationError, AuthenticationError} from 'apollo-server-express';
import jwt from 'jsonwebtoken';

const createToken = async (user, secret, expiresIn) => {
    return await jwt.sign({user_id: user.id}, secret, {expiresIn});
};

export default {
    Query: {
        users: combineResolvers(
            isAdmin,
            async (parent, args, { models }) => {
                return await models.User.findAll()
            }
        ),

        findUser: async (parent, {id, name}, {models}) => {
            if(id !== undefined)
                return await models.User.findByPk(id);
            else if(name !== undefined)
                return await models.User.findOne({where:{name:name}});
            else
                throw new ValidationError(`Parameter 'id' or 'name' must be set`);
        },

        whoami: async (parent, args, {models, me}) => {
            return me;
        },
    },

    Mutation: {
        signUp: async (parent, {name, login, password}, {models}) => {
            const user = await models.User.create({name: name, login: login, password: password, roles: 'users'});
            const token = await createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
            return {token: token};
        },

        setUserRoles: combineResolvers(
            isAdmin,
            async (parent, {login, roles}, {models}) => {
                const user = await models.User.findOne({where:{login:login}});
                if(!user)
                    throw new ValidationError(`User with login=${login} not found`)
                await user.update({roles: roles});
                return await models.User.findOne({where:{login:login}});
            }
        ),

        signIn: async (parent, {login, password}, {models}) => {
            const user = await models.User.findOne({where:{login:login}});
            if(!user)
                throw new AuthenticationError(`User with login=${login} not found`)
            const isValid = await user.validatePassword(password);
            if(!isValid)
                throw new AuthenticationError(`Invalid password`)
            const token = await createToken(user, process.env.JWT_SECRET, process.env.JWT_EXPIRES);
            return {token: token};
        }
    },

    User: {
        login: combineResolvers(
            isAdmin,
            async (user, args, {models}) => {return user.login;}
        ),
        password: combineResolvers(
            isAdmin,
            async (user, args, {models}) => {return user.password;}
        ),
        roles: combineResolvers(
            isAdmin,
            async (user, args, {models}) => {return user.roles;}
        ),
    },
};