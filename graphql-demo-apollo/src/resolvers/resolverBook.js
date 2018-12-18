import {services} from "../services";
import {dataLoaders} from "../loaders";

export default {
    Query: {
        books: async (parent, {}, {me}) => {
            return await services.Books.books({}, {me});
        },

        findBook: async (parent, {id, title}, {me}) => {
            return await services.Books.findBook({id, title}, {me});
        },
    },

    Mutation: {
        createBook: async (parent, {authorId, title, releaseDate, description}, {me}) => {
            return await services.Books.createBook({authorId, title, releaseDate, description}, {me});
        },

        changeBook: async (parent, {id, authorId, title, releaseDate, description}, {me}) => {
            return await services.Books.changeBook({id, authorId, title, releaseDate, description}, {me});
        },

        deleteBook: async (parent, {id}, {me}) => {
            return await services.Books.deleteBook({id}, {me});
        },
    },

    Book: {
        author: async (book, {}, {me}) => {
            return await dataLoaders.authorsByIds.load(book.authorId);
        },
        comments: async (book, {}, {me}) => {
            return await dataLoaders.commentsByBookIds.load(book.id);
        },
    },
};
