package ru.cinimex.rnd.graphqltest.model.services.mongo;

import graphql.GraphQLException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Author;
import ru.cinimex.rnd.graphqltest.model.documents.Book;

import java.util.ArrayList;
import java.util.List;

@Service
public class BooksService {
    @Autowired private AuthorsRepository authorsRepository;
    @Autowired private BooksRepository booksRepository;

    /////////////////////////////////////////////////////////////
    // QUERY
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'books_all'")
    public List<Book> books(){
        return (List<Book>) booksRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'book_ID='.concat(#id)")
    public Book findBookById(String id){
        return booksRepository.getBookById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'book_TITLE='.concat(#title)")
    public Book findBookByTitle(String title){
        return booksRepository.getBookByTitle(title);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Book create(Book book) {
        if(book.getId()!=null)
            if(booksRepository.getBookById(book.getId().toHexString())!=null)
                throw new GraphQLException("Book with given id already exist.");

        book = booksRepository.save(book);

        Author author = book.getAuthor();
        List<Book> author_books = author.getBooks();
        if(author_books==null)
            author_books = new ArrayList<>();
        author_books.add(book);
        author.setBooks(author_books);
        authorsRepository.save(author);

        return book;
    }

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Book change(Book book){
        return booksRepository.save(book);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public void delete(ObjectId id){
        booksRepository.deleteById(id);
    }
}
