import Sequelize from 'sequelize';

export const loaderAuthorsById = async (keys, models) => {
    const authors = await models.Author.findAll({where:{id:{[Sequelize.Op.in]: keys}}});

    return keys.map(key => authors.find(author=> author.id === key));
};
