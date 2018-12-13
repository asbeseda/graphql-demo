import Sequelize from 'sequelize';

export const loaderBooksById = async (keys, models) => {
    const books = await models.Book.findAll({where:{id:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => books.find(book => book.id === key));
};

export const loaderBooksByAuthorId = async (keys, models) => {
    const books = await models.Book.findAll({where:{authorId:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => books.filter(book => book.authorId === key));
};
