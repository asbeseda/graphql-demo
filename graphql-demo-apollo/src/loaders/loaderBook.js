import {Sequelize} from 'sequelize';

export const loaderBooksByIds = async (keys) => {
    const books = await models.Book.findAll({where:{id:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => books.find(book => book.id === key));
};

export const loaderBooksByAuthorIds = async (keys) => {
    const books = await models.Book.findAll({where:{authorId:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => books.filter(book => book.authorId === key));
};
