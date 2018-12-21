package ru.cinimex.rnd.graphqltest.model.services.mongo;

import graphql.GraphQLException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Book;
import ru.cinimex.rnd.graphqltest.model.documents.Comment;

import java.util.ArrayList;
import java.util.List;

@Service
public class CommentsService {
    @Autowired private BooksRepository booksRepository;
    @Autowired private CommentsRepository commentsRepository;

    /////////////////////////////////////////////////////////////
    // QUERY
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'comments_all'")
    public List<Comment> comments(){
        return (List<Comment>) commentsRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'comment_ID='.concat(#id)")
    public Comment findCommentById(String id){
        return commentsRepository.getCommentById(id);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Comment create(Comment comment) {
        if(comment.getId()!=null)
            if(commentsRepository.getCommentById(comment.getId().toHexString())!=null)
                throw new GraphQLException("Comment with givven id already exist.");

        comment = commentsRepository.save(comment);

        Book book = comment.getBook();
        List<Comment> book_comments = book.getComments();
        if(book_comments==null)
            book_comments = new ArrayList<>();
        book_comments.add(comment);
        book.setComments(book_comments);
        booksRepository.save(book);

        return comment;
    }

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Comment change(Comment comment){
        return commentsRepository.save(comment);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public void delete(ObjectId id){
        commentsRepository.deleteById(id);
    }
}
