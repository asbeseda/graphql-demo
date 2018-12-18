import {Sequelize} from 'sequelize';
import logger from './../utils/logger';

export const start = async () => {
    logger.debug("Database parameters from loadConfig:");
    logger.debug("	DB_HOST=" + process.env.DB_HOST);
    logger.debug("	DB_PORT=" + process.env.DB_PORT);
    logger.debug("	DB_DATABASE=" + process.env.DB_DATABASE);
    logger.debug("	DB_USER=" + process.env.DB_USER);
    logger.debug("	DB_PASSWORD=" + process.env.DB_PASSWORD);
    logger.debug("	DB_DIALECT=" + process.env.DB_DIALECT);
    logger.debug("	DB_PATH=" + process.env.DB_PATH);
    logger.debug("	DB_FILL_WITH_TESTDATA=" + process.env.DB_FILL_WITH_TESTDATA);

    const sequelize = new Sequelize(
        process.env.DB_DATABASE,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            storage: process.env.DB_PATH,

            pool: {max: 5, min: 0, acquire: 30000, idle: 10000},
            logging: logger.debug,

            operatorsAliases: {
                $in: Sequelize.Op.in
            },
        }
    );
    global.sequelize = sequelize;

    const models = {
        Author: sequelize.import('./author'),
        Book: sequelize.import('./book'),
        Comment: sequelize.import('./comment'),
        User: sequelize.import('./user')
    };
    global.models = models;

    Object.keys(models).forEach(key => {
        if ('associate' in models[key]) {
            models[key].associate(models);
        }
    });

};
