import {combineResolvers} from 'graphql-resolvers';
import {hasOneOfRoles} from './authorization';
import {ValidationError} from 'apollo-server';

export default {
    Query: {
        books: async (parent, args, { models }) => {
            return await models.Book.findAll()
        },

        findBook: async (parent, {id, title}, {models}) => {
            if (id !== undefined)
                return await models.Book.findByPk(id);
            else if (title !== undefined)
                return await models.Book.findOne({where: {title: title}});
            else
                throw new ValidationError(`Parameter 'id' or 'title' must be set`);
        },
    },

    Mutation: {
        createBook: combineResolvers(
            hasOneOfRoles(["ADMIN","BOOKS_CREATE"]),
            async (parent, {authorId, title, releaseDate, description}, {models}) => {
                return await models.Book.create({authorId: authorId, title: title, releaseDate: releaseDate, description: description})
            }
        ),

        changeBook: combineResolvers(
            hasOneOfRoles(["ADMIN","BOOKS_CHANGE"]),
            async (parent, {id, authorId, title, releaseDate, description}, {models}) => {
                const book = await models.Book.findByPk(id);
                if(!book)
                    throw new ValidationError(`Book with id=${id} not found`)
                const newValues = {
                    authorId:       authorId ? authorId : book.authorId,
                    title:          title ? title : book.title,
                    releaseDate:    releaseDate ? releaseDate : book.releaseDate,
                    description:    description ? description : book.description

                };
                await book.update(newValues);
                return await models.Book.findByPk(id);
            }
        ),

        deleteBook: combineResolvers(
            hasOneOfRoles(["ADMIN","BOOKS_DELETE"]),
            async (parent, {id}, {models}) => {
                const result = await models.Book.destroy({where:{id:id}, cascade: true});
                return result;
            }
        ),
    },

    Book: {
        author: async (book, args, {models, loaders}) => {
            return await loaders.authorById.load(book.authorId);
        },
        comments: async (book, args, {models, loaders}) => {
            return await loaders.commentByBookId.load(book.id);
        }
    },
};
