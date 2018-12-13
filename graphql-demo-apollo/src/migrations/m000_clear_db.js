import logger from './../utils/logger';

export async function migration() {
    logger.debug(`>>> Clear all database data.`);
    await models.Comment.destroy({where:{}, truncate:true, cascade: true});
    await models.Book.destroy({where:{}, truncate:true, cascade: true});
    await models.Author.destroy({where:{}, truncate:true, cascade: true});
    await models.User.destroy({where:{}, truncate:true, cascade: true});
}
