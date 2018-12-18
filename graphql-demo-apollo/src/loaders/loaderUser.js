import Sequelize from 'sequelize';

export const loaderUsersById = async (keys) => {
    const users = await models.User.findAll({where:{id:{[Sequelize.Op.in]: keys}}});
    return keys.map(key => users.find(user => user.id === key));
};
