import {combineResolvers} from 'graphql-resolvers';
import {hasOneOfRoles} from './authorization';
import {ValidationError} from 'apollo-server-express';

export default {
    Query: {
        authors: async (parent, args, { models }) => {
            return await models.Author.findAll()
        },

        findAuthor: async (parent, {id, name}, {models}) => {
            if(id !== undefined)
                return await models.Author.findByPk(id);
            else if(name !== undefined)
                return await models.Author.findOne({where:{name:name}});
            else
                throw new ValidationError(`Parameter 'id' or 'name' must be set`);
        },
    },

    Mutation: {
        createAuthor: combineResolvers(
            hasOneOfRoles(["ADMIN","AUTHORS_CREATE"]),
            async (parent, {name, biography}, {models}) => {
                return await models.Author.create({name: name, biography: biography})
            }
        ),

        changeAuthor: combineResolvers(
            hasOneOfRoles(["ADMIN","AUTHORS_CHANGE"]),
            async (parent, {id, name, biography}, {models}) => {
                const author = await models.Author.findByPk(id);
                if(!author)
                    throw new ValidationError(`Author with id=${id} not found`);
                const newValues = {
                    name:       name ? name : author.name,
                    biography:  biography ? biography : author.biography
                };
                await author.update(newValues);
                return await models.Author.findByPk(id);
            }
        ),

        deleteAuthor: combineResolvers(
            hasOneOfRoles(["ADMIN","AUTHORS_DELETE"]),
            async (parent, {id}, {models}) => {
                const result = await models.Author.destroy({where:{id:id}, cascade: true});
                return result;
            }
        ),

    },

    Author: {
        books: async (author, args, {models, loaders}) => {
            return await loaders.bookByAuthorId.load(author.id);
        }
    },
};
