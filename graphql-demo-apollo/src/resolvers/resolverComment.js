import {combineResolvers} from 'graphql-resolvers';
import {withFilter} from 'graphql-subscriptions';
import {isAuthenticated, checkOneOfRoles} from './authorization';

export default {
    Query: {
        comments: async (parent, args, { models }) => {
            return await models.Comment.findAll()
        },
    },

    Mutation: {
        createComment: combineResolvers(
            isAuthenticated,
            async (parent, {bookId, content}, {models, me}) => {
                const newComment = await models.Comment.create({bookId: bookId, userId: me.id, content: content, createdAt: require('moment')().format()});
                if(newComment){
                    const payload = {onComment: {eventType: 'COMMENT_ADDED', comment: newComment}}
                    pubsub.publish('comments_events_chanel', payload);
                }
                return newComment;
            }
        ),

        changeComment: combineResolvers(
            isAuthenticated,
            async (parent, {id, bookId, content}, {models, me}) => {
                const comment = await models.Comment.findByPk(id);
                if(!comment)
                    throw new GraphQLError(`Comment with id=${id} not found`);
                if(!checkOneOfRoles(me.roles, ["ADMIN", "COMMENTS_CHANGE"]) && me.id !== comment.userId)
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

            }
        ),

        deleteComment: combineResolvers(
            isAuthenticated,
            async (parent, {id}, {models, me}) => {
                const comment = await models.Comment.findByPk(id);
                if(!comment)
                    throw new GraphQLError(`Comment with id=${id} not found`);
                if(!checkOneOfRoles(me.roles, ["ADMIN", "COMMENTS_DELETE"]) && me.id !== comment.userId)
                    throw new ForbiddenError(`You are not authorized to change comment`);
                const deleted = await models.Comment.destroy({where:{id:id}, cascade: true});
                if(deleted) {
                    const payload = {onComment: {eventType: 'COMMENT_DELETED', comment: comment}}
                    pubsub.publish('comments_events_chanel', payload);
                }
                return deleted;
            }
        ),
    },

    Subscription: {
        onComment: {
            subscribe: withFilter(
                () => pubsub.asyncIterator('comments_events_chanel'),
                (payload, variables) => {
                    if(variables.bookId && payload.comment.bookId !== variables.bookId)
                        return false;
                    if(variables.eventType && payload.eventType !== variables.eventType)
                        return false;
                    return true;
                }
            )
        }
    },

    Comment: {
        book: async (comment, args, {models, loaders}) => {
            return await loaders.bookById.load(comment.bookId);
        },
        user: async (comment, args, {models, loaders}) => {
            return await loaders.userById.load(comment.userId);
        }
    }
};
