package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Author;
import ru.cinimex.rnd.graphqltest.model.documents.Book;

import java.util.List;

@Service
public class BooksService {
    @Autowired private BooksRepository booksRepository;

    /////////////////////////////////////////////////////////////
    // QUERY
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "books_all")
    public List<Book> books(){
        return (List<Book>) booksRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "books", key = "'ID='.concat(#id)")
    public Book findBookById(String id){
        return booksRepository.getBookById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "books", key = "'TITLE='.concat(#title)")
    public Book findBookByTitle(String title){
        return booksRepository.getBookByTitle(title);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {
            @CacheEvict(value = "books", allEntries = true),
            @CacheEvict(value = "books_all", allEntries = true),
    })
    public Book save(Book book){
        return booksRepository.save(book);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {
            @CacheEvict(value = "books", allEntries = true),
            @CacheEvict(value = "books_all", allEntries = true),
    })
    public void delete(ObjectId id){
        booksRepository.deleteById(id);
    }
}
