import resolverUser from './resolverUser'
import resolverAuthor from './resolverAuthor'
import resolverBook from './resolverBook'
import resolverComment from './resolverComment'

const resolvers = [
    resolverUser,
    resolverAuthor,
    resolverBook,
    resolverComment
];
global.resolvers = resolvers;

module.exports = resolvers;