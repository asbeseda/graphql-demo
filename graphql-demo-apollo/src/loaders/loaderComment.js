import {Sequelize} from 'sequelize';

export const loaderCommentsByIds = async (keys) => {
    const comments = await models.Comment.findAll({where:{id:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => comments.find(comment => comment.id === key));
};

export const loaderCommentsByBookIds = async (keys) => {
    const comments = await models.Comment.findAll({where:{bookId:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => comments.filter(comment => comment.bookId === key));
};
