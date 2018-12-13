import { loaderUsersById } from './loaderUser';
import { loaderAuthorsById } from './loaderAuthor';
import { loaderBooksById, loaderBooksByAuthorId } from './loaderBook';
import { loaderCommentsById, loaderCommentsByBookId } from './loaderComment';

export default {
    loaderAuthorsById: loaderAuthorsById,
    loaderBooksById: loaderBooksById,
    loaderBooksByAuthorId: loaderBooksByAuthorId,
    loaderCommentsById: loaderCommentsById,
    loaderCommentsByBookId: loaderCommentsByBookId,
    loaderUsersById: loaderUsersById
};
