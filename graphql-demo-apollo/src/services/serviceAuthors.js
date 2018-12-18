import {ValidationError} from 'apollo-server-express';
import {hasOneOfRoles} from "../auth/checkAuth";

export default {
    ///////////////////////////////////////////
    // QUERY AUTHORS
    ///////////////////////////////////////////

    authors: async ({}, {me}) => {
        return await models.Author.findAll();
    },

    findAuthor: async ({id, name}, {me}) => {
        if(id !== undefined)
            return await models.Author.findByPk(id);
        else if(name !== undefined)
            return await models.Author.findOne({where:{name:name}});
        else
            throw new ValidationError(`Parameter 'id' or 'name' must be set`);
    },

    createAuthor: async ({name, biography}, {me}) => {
        hasOneOfRoles(me,["ADMIN","AUTHORS_CREATE"]);
        return await models.Author.create({name: name, biography: biography})
    },

    ///////////////////////////////////////////
    // CHANGE AUTHORS
    ///////////////////////////////////////////

    changeAuthor: async ({id, name, biography}, {me}) => {
        hasOneOfRoles(me,["ADMIN","AUTHORS_CHANGE"]);
        const author = await models.Author.findByPk(id);
        if(!author)
            throw new ValidationError(`Author with id=${id} not found`);
        const newValues = {
            name:       name ? name : author.name,
            biography:  biography ? biography : author.biography
        };
        await author.update(newValues);
        return await models.Author.findByPk(id);
    },

    deleteAuthor: async ({id}, {me}) => {
        hasOneOfRoles(me,["ADMIN","AUTHORS_DELETE"]);
        const result = await models.Author.destroy({where:{id:id}, cascade: true});
        return result;
    },

}