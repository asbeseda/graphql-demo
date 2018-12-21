import services from "../services";
import dataLoaders from "../loaders";

import {withFilter} from 'graphql-subscriptions';

export default {
    Query: {
        comments: async (parent, {}, {me}) => {
            return await services.Comments.comments({}, {me});
        },
    },

    Mutation: {
        createComment: async (parent, {id, bookId, content}, {me}) => {
            return await services.Comments.createComment({id, bookId, content}, {me});
        },

        changeComment: async (parent, {id, bookId, content}, {me}) => {
            return await services.Comments.changeComment({id, bookId, content}, {me});
        },

        deleteComment: async (parent, {id}, {me}) => {
            return await services.Comments.deleteComment({id}, {me});
        },
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
        book: async (comment, {}, {me}) => {
            return dataLoaders.booksByIds.load(comment.bookId);
        },
        user: async (comment, {}, {me}) => {
            return dataLoaders.usersByIds.load(comment.userId);
        },
    }
};
