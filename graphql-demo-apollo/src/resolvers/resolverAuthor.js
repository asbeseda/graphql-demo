export default {
    Query: {
        authors: async (parent, {}, {me}) => {
            return await services.Author.authors({}, {me});
        },

        findAuthor: async (parent, {id, name}, {me}) => {
            return await services.Authors.findAuthor({id, name}, {me});
        },
    },

    Mutation: {
        createAuthor: async (parent, {name, biography}, {me}) => {
            return await services.Authors.createAuthor({name, biography}, {me});
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
            return await dataLoaders.bookByAuthorId.load(author.id);
        },
    },
};
