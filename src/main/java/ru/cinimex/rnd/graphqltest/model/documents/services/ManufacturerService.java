package ru.cinimex.rnd.graphqltest.model.documents.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;

import java.util.List;

@Service
public class ManufacturerService {

    @Autowired private ManufacturerRepository manufacturerRepository;

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {
            @CacheEvict(value = "manufacturers", allEntries = true),
            @CacheEvict(value = "manufacturers_all", allEntries = true),
    })
    public Manufacturer save(Manufacturer manufacturer){
        return manufacturerRepository.save(manufacturer);
    }

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    @Caching(evict = {
            @CacheEvict(value = "manufacturers", allEntries = true),
            @CacheEvict(value = "manufacturers_all", allEntries = true),
    })
    public List<Manufacturer> saveAll(List<Manufacturer> manufacturers){
        return (List<Manufacturer>)manufacturerRepository.saveAll(manufacturers);
    }

    @PreAuthorize("hasRole('ROLE_DELETE')")
    @Caching(evict = {
            @CacheEvict(value = "manufacturers", allEntries = true),
            @CacheEvict(value = "manufacturers_all", allEntries = true),
    })
    public void delete(ObjectId id){
        manufacturerRepository.deleteById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "manufacturers_all")
    public List<Manufacturer> findAll(){
        return (List<Manufacturer>)manufacturerRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "manufacturers", key = "'ID='.concat(#id)")
    public Manufacturer getManufacturerById(String id){
        return manufacturerRepository.getManufacturerById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    @Cacheable(cacheNames = "manufacturers", key = "'NAME='.concat(#name)")
    public Manufacturer getManufacturerByName(String name){
        return manufacturerRepository.getManufacturerByName(name);
    }
}
