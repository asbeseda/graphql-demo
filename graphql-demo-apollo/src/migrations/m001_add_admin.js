import logger from './../utils/logger';

export async function migration() {
    logger.debug(`>>> Add admin user.`);
    await models.User.create({
        id: 'admin',
        name: 'Администратор',
        login: 'admin',
        password: 'admin',
        roles: 'ADMIN'
    });
}
