package ru.cinimex.rnd.graphqltest.graphql;

import com.coxautodev.graphql.tools.GraphQLQueryResolver;
import com.coxautodev.graphql.tools.GraphQLResolver;
import graphql.GraphQLException;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.Cache;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;
import ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CustomResolver implements GraphQLQueryResolver  {

    @Autowired private ApplicationContext appContext;
    @Autowired private ManufacturerService manufacturerService;

    public CustomResolver(){
        log.debug("GraphQLResolver bean initialing for <Query>...");
    }

    /* RESOLVER - <Query.manufacturers> */
    public List<Manufacturer> manufacturers() {
        return manufacturerService.findAll();
    }

    /* RESOLVER - <Query.manufacturer()> */
    public Manufacturer manufacturer(String id, String name) {
        if(id!=null)
            return manufacturerService.getManufacturerById(id);
        if(name!=null)
            return manufacturerService.getManufacturerByName(name);
        throw new GraphQLException("Query parameter must be one of [id, name].");
    }

    /* RESOLVER - <Query.manufacturerNew()> */
    public Manufacturer manufacturerNew(Manufacturer _new) {
        return manufacturerService.save(_new);
    }

    /* RESOLVER - <Query.cachies()> */
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

