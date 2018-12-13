import { ForbiddenError } from 'apollo-server';
import { combineResolvers, skip } from 'graphql-resolvers';

export const isAuthenticated = (parent, args, { me }) => {
    if(me!=null)
        return skip;
    return new ForbiddenError('Not authenticated as user.');
}

export const checkOneOfRoles = (userRoles, roles) => {
    const user_roles_arr = userRoles.split(", ");
    for (var idx in roles){
        if(user_roles_arr.includes(roles[idx]))
            return true;
    }
    return false;
}


export const hasOneOfRoles = (roles) => combineResolvers(
  isAuthenticated,
  (parent, args, {me}) => {
      if (checkOneOfRoles(me.roles, roles))
        return skip;
      else
        return new ForbiddenError(`Not authorized as ${JSON.stringify(roles)}`)
  }
);

export const isAdmin = hasOneOfRoles(["ADMIN"]);
