import {Sequelize} from 'sequelize';

export const loaderAuthorsByIds = async (keys) => {
    const authors = await models.Author.findAll({where:{id:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => authors.find(author=> author.id === key));
};
