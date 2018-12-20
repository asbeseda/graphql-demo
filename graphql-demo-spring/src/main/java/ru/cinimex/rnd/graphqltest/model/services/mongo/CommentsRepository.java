package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.cinimex.rnd.graphqltest.model.documents.Comment;

/* Is not public, can be used only in services from this package */
interface CommentsRepository extends PagingAndSortingRepository<Comment, ObjectId> {
    Comment getCommentById(String id);
}
