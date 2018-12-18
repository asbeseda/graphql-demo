import {ValidationError, AuthenticationError} from 'apollo-server-express';
import {checkOneOfRoles, hasOneOfRoles, isAdmin, isAuthenticated} from "../auth/checkAuth";

export default {
    ///////////////////////////////////////////
    // QUERY COMMENTS
    ///////////////////////////////////////////
    comments: async ({}, {me}) => {
        return await models.Comment.findAll()
    },

    ///////////////////////////////////////////
    // CHANGE COMMENTS
    ///////////////////////////////////////////
    createComment: async ({bookId, content}, {me}) => {
        isAuthenticated(me);
        const newComment = await models.Comment.create({bookId: bookId, userId: me.id, content: content, createdAt: require('moment')().format()});
        if(newComment){
            const payload = {onComment: {eventType: 'COMMENT_ADDED', comment: newComment}}
            pubsub.publish('comments_events_chanel', payload);
        }
        return newComment;
    },

    changeComment: async ({id, bookId, content}, {me}) => {
        isAuthenticated(me);
        const comment = await models.Comment.findByPk(id);
        if(!comment)
            throw new GraphQLError(`Comment with id=${id} not found`);
        if(!checkOneOfRoles(me, ["ADMIN", "COMMENTS_CHANGE"]) && me.id !== comment.userId)
            throw new ForbiddenError(`You are not authorized to change comment`);
        const newValues = {
            content:    content ? content : comment.content,
            changedAt:  require('moment')().format()
        };
        await comment.update(newValues);
        const newComment = await models.Comment.findByPk(id);
        if(newComment){
            const payload = {onComment: {eventType: 'COMMENT_CHANGED', comment: newComment}}
            pubsub.publish('comments_events_chanel', payload);
        }
        return newComment;
    },

    deleteComment: async ({id}, {me}) => {
        isAuthenticated(me);
        const comment = await models.Comment.findByPk(id);
        if(!comment)
            throw new GraphQLError(`Comment with id=${id} not found`);
        if(!checkOneOfRoles(me, ["ADMIN", "COMMENTS_DELETE"]) && me.id !== comment.userId)
            throw new ForbiddenError(`You are not authorized to change comment`);
        const deleted = await models.Comment.destroy({where:{id:id}, cascade: true});
        if(deleted) {
            const payload = {onComment: {eventType: 'COMMENT_DELETED', comment: comment}}
            pubsub.publish('comments_events_chanel', payload);
        }
        return deleted;
    },

}