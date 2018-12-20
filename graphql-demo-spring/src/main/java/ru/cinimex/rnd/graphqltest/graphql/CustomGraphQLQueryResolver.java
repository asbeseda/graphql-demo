package ru.cinimex.rnd.graphqltest.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import graphql.GraphQLException;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import ru.cinimex.rnd.graphqltest.model.documents.Author;
import ru.cinimex.rnd.graphqltest.model.documents.Book;
import ru.cinimex.rnd.graphqltest.model.documents.Comment;
import ru.cinimex.rnd.graphqltest.model.services.mongo.BooksService;
import ru.cinimex.rnd.graphqltest.model.services.mongo.AuthorsService;
import ru.cinimex.rnd.graphqltest.model.services.mongo.CommentsService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CustomGraphQLQueryResolver implements GraphQLQueryResolver  {

    @Autowired private ApplicationContext appContext;
    @Autowired private AuthorsService authorsService;
    @Autowired private BooksService booksService;
    @Autowired private CommentsService commentsService;


    public CustomGraphQLQueryResolver(){
        log.debug("GraphQLResolver bean initialing for <Query>...");
    }

    /////////////////////////////////////////////////////////////
    // AUTHORS
    /////////////////////////////////////////////////////////////
    public List<Author> authors() {
        return authorsService.authors();
    }

    public Author findAuthor(String id, String name) {
        if(id!=null)
            return authorsService.findAuthorById(id);
        if(name!=null)
            return authorsService.findAuthorByName(name);
        throw new GraphQLException("Query parameter must be one of [id, name].");
    }

    /////////////////////////////////////////////////////////////
    // BOOKS
    /////////////////////////////////////////////////////////////
    public List<Book> books(){
        return booksService.books();
    }

    public Book findBook(String id, String title){
        if(id!=null)
            return booksService.findBookById(id);
        if(title!=null)
            return booksService.findBookByTitle(title);
        throw new GraphQLException("Query parameter must be one of [id, title].");
    }

    /////////////////////////////////////////////////////////////
    // COMMENTS
    /////////////////////////////////////////////////////////////
    public List<Comment> comments(){
        return commentsService.comments();
    }

    /////////////////////////////////////////////////////////////
    // CACHIES
    /////////////////////////////////////////////////////////////
    public List<Cache> cachies(String name) {
        CacheManager cacheManager = appContext.getBean(CacheManager.class);
        if(name!=null){
            org.springframework.cache.Cache cache = cacheManager.getCache(name);
            if(cache==null)
                return null;
            return Collections.singletonList((Cache)cache.getNativeCache());
        } else {
            List res =
                cacheManager.getCacheNames().stream()
                    .map(cacheName -> {return (Cache)cacheManager.getCache(cacheName).getNativeCache();})
                    .collect(Collectors.toList());
            return res;
        }
    }

}

