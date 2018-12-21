import DataLoader from "dataloader";
import { loaderUsersByIds } from './loaderUser';
import { loaderAuthorsByIds } from './loaderAuthor';
import { loaderBooksByIds, loaderBooksByAuthorIds } from './loaderBook';
import { loaderCommentsByIds, loaderCommentsByBookIds } from './loaderComment';

const dataLoaders = {
    usersByIds: new DataLoader(keys => loaderUsersByIds(keys)),
    authorsByIds: new DataLoader(keys => loaderAuthorsByIds(keys)),
    booksByIds: new DataLoader(keys => loaderBooksByIds(keys)),
    booksByAuthorIds: new DataLoader(keys => loaderBooksByAuthorIds(keys)),
    commentsByIds: new DataLoader(keys => loaderCommentsByIds(keys)),
    commentsByBookIds: new DataLoader(keys => loaderCommentsByBookIds(keys)),
}
global.dataLoaders = dataLoaders;

module.exports = dataLoaders;