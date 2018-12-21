package ru.cinimex.rnd.graphqltest.model.services.mongo;

import graphql.GraphQLException;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
    @Cacheable(cacheNames = "app_cache", key = "'authors_all'")
    public List<Author> authors(){
        List<Author> authors = (List<Author>)authorsRepository.findAll();
        return authors;
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'author_ID='.concat(#id)")
    public Author findAuthorById(String id){
        return authorsRepository.getAuthorById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "app_cache", key = "'author_NAME='.concat(#name)")
    public Author findAuthorByName(String name){
        return authorsRepository.getAuthorByName(name);
    }

    /////////////////////////////////////////////////////////////
    // UPDATE
    /////////////////////////////////////////////////////////////
    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Author create(Author author) {
        if(author.getId()!=null)
            if(authorsRepository.getAuthorById(author.getId().toHexString())!=null)
                throw new GraphQLException("Author with given id already exist.");

        return authorsRepository.save(author);
    }

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public Author change(Author author){
        return authorsRepository.save(author);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {@CacheEvict(value = "app_cache", allEntries = true)})
    public void delete(ObjectId id){
        authorsRepository.deleteById(id);
    }

}
