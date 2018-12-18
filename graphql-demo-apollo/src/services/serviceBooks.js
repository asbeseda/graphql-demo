import {ValidationError} from 'apollo-server-express';
import {hasOneOfRoles} from "../auth/checkAuth";

export default {
    ///////////////////////////////////////////
    // QUERY BOOKS
    ///////////////////////////////////////////

    books: async ({}, {me}) => {
        return await models.Book.findAll()
    },

    findBook: async ({id, title}, {me}) => {
        if (id !== undefined)
            return await models.Book.findByPk(id);
        else if (title !== undefined)
            return await models.Book.findOne({where: {title: title}});
        else
            throw new ValidationError(`Parameter 'id' or 'title' must be set`);
    },

    ///////////////////////////////////////////
    // CHANGE BOOKS
    ///////////////////////////////////////////

    createBook: async ({authorId, title, releaseDate, description}, {me}) => {
        hasOneOfRoles(me, ["ADMIN","BOOKS_CREATE"]);
        return await models.Book.create({authorId: authorId, title: title, releaseDate: releaseDate, description: description})
    },

    changeBook: async ({id, authorId, title, releaseDate, description}, {me}) => {
        hasOneOfRoles(me, ["ADMIN","BOOKS_CHANGE"]);
        const book = await models.Book.findByPk(id);
        if(!book)
            throw new ValidationError(`Book with id=${id} not found`)
        const newValues = {
            authorId:       authorId ? authorId : book.authorId,
            title:          title ? title : book.title,
            releaseDate:    releaseDate ? releaseDate : book.releaseDate,
            description:    description ? description : book.description

        };
        await book.update(newValues);
        return await models.Book.findByPk(id);
    },

    deleteBook: async ({id}, {me}) => {
        hasOneOfRoles(me, ["ADMIN","BOOKS_DELETE"]);
        const result = await models.Book.destroy({where:{id:id}, cascade: true});
        return result;
    },

}