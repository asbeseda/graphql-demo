import services from "../services";
import dataLoaders from "../loaders";

export default {
    Query: {
        authors: async (parent, {}, {me}) => {
            return await services.Authors.authors({}, {me});
        },

        findAuthor: async (parent, {id, name}, {me}) => {
            return await services.Authors.findAuthor({id, name}, {me});
        },
    },

    Mutation: {
        createAuthor: async (parent, {id, name, biography}, {me}) => {
            return await services.Authors.createAuthor({id, name, biography}, {me});
        },

        changeAuthor: async (parent, {id, name, biography}, {me}) => {
            return await services.Authors.changeAuthor({id, name, biography}, {me});
        },

        deleteAuthor: async (parent, {id}, {me}) => {
            return await services.Authors.deleteAuthor({id}, {me});
        },
    },

    Author: {
        books: async (author, {}, {me}) => {
            return await dataLoaders.booksByAuthorIds.load(author.id);
        },
    },
};
