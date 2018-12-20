package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Author;


import java.util.List;

@Service
public class AuthorsService {
    @Autowired private AuthorsRepository authorsRepository;

    /////////////////////////////////////////////////////////////
    // QUERY
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "authors_all")
    public List<Author> authors(){
        return (List<Author>) authorsRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "authors", key = "'ID='.concat(#id)")
    public Author findAuthorById(String id){
        return authorsRepository.getAuthorById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "authors", key = "'NAME='.concat(#name)")
    public Author findAuthorByName(String name){
        return authorsRepository.getAuthorByName(name);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {
            @CacheEvict(value = "authors", allEntries = true),
            @CacheEvict(value = "authors_all", allEntries = true),
    })
    public Author save(Author author){
        return authorsRepository.save(author);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {
        @CacheEvict(value = "authors", allEntries = true),
        @CacheEvict(value = "authors_all", allEntries = true),
    })
    public void delete(ObjectId id){
        authorsRepository.deleteById(id);
    }

}
