import { ForbiddenError } from 'apollo-server-express';

export const isAuthenticated = (me) => {
    if(me === undefined || me ===  null)
        throw new ForbiddenError('Not authenticated as user.');
};

export const checkOneOfRoles = (me, roles) => {
    isAuthenticated(me);

    const userRoles = me.roles;
    const user_roles_arr = userRoles.split(", ");
    for (var idx in roles){
        if(user_roles_arr.includes(roles[idx]))
            return true;
    }
    return false;
};

export const hasOneOfRoles = (me, roles) => {
    isAuthenticated(me);
    if (!checkOneOfRoles(me, roles))
        throw new ForbiddenError(`Not authorized as ${JSON.stringify(roles)}`)
};

export const isAdmin = (me) => {
    isAuthenticated(me);
    hasOneOfRoles(me,["ADMIN"]);
};