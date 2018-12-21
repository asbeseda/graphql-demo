import services from "../services";
import dataLoaders from "../loaders";

import {isAdmin} from "../auth/checkAuth";

export default {
    Query: {
        whoami: async (parent, {}, {me}) => {
            return await services.Users.whoami({}, {me})
        },

        users: async (parent, {}, {me}) => {
            return await services.Users.users({}, {me})
        },

        findUser: async (parent, {id, name}, {me}) => {
            return await services.Users.findUser({id, name}, {me})
        },

    },

    Mutation: {
        signUp: async (parent, {id, name, login, password}, {me}) => {
            return await services.Users.signUp({id, name, login, password}, {me})
        },

        setUserRoles: async (parent, {login, roles}, {me}) => {
            return await services.Users.setUserRoles({login, roles}, {me})
        },

        signIn: async (parent, {login, password}, {me}) => {
            return await services.Users.signIn({login, password}, {me})
        }
    },

    User: {
        login: async (user, {}, {me}) => {
            isAdmin(me);
            return user.login;
        },
        password: async (user, {}, {me}) => {
            isAdmin(me);
            return user.password;
        },
        roles: async (user, {}, {me}) => {
            isAdmin(me);
            return user.roles;
        },
    },
};