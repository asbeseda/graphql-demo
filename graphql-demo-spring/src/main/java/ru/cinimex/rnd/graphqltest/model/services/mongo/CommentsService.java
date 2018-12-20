package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Book;
import ru.cinimex.rnd.graphqltest.model.documents.Comment;

import java.util.List;

@Service
public class CommentsService {
    @Autowired private CommentsRepository commentsRepository;

    /////////////////////////////////////////////////////////////
    // QUERY
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "comments_all")
    public List<Comment> comments(){
        return (List<Comment>) commentsRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "books", key = "'ID='.concat(#id)")
    public Comment findCommentById(String id){
        return commentsRepository.getCommentById(id);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {
            @CacheEvict(value = "comments", allEntries = true),
            @CacheEvict(value = "comments_all", allEntries = true),
    })
    public Comment save(Comment comment){
        return commentsRepository.save(comment);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {
            @CacheEvict(value = "comments", allEntries = true),
            @CacheEvict(value = "comments_all", allEntries = true),
    })
    public void delete(ObjectId id){
        commentsRepository.deleteById(id);
    }
}
