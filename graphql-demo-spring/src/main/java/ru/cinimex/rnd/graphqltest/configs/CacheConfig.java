package ru.cinimex.rnd.graphqltest.configs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import javax.annotation.PostConstruct;
import java.util.stream.Collectors;

@Configuration
@EnableCaching
@Slf4j
public class CacheConfig {
    // How to use see:
    //  https://www.foreach.be/blog/spring-cache-annotations-some-tips-tricks
    //  http://websystique.com/spring/spring-4-cacheable-cacheput-cacheevict-caching-cacheconfig-enablecaching-tutorial/

    @Autowired private CacheManager cacheManager;

    @Bean
    public CacheManager cacheManager() {
        log.debug("Bean initialing 'CacheManager'...");
        return new EhCacheCacheManager(ehCacheCacheManager().getObject());
    }

    @Bean
    public EhCacheManagerFactoryBean ehCacheCacheManager() {
        EhCacheManagerFactoryBean factory = new EhCacheManagerFactoryBean();
        factory.setConfigLocation(new ClassPathResource("ehcache.xml"));
        factory.setShared(true);
        return factory;
    }

    @PostConstruct
    private void PostConstruct(){
        log.debug("Config executed: "+this.getClass().getCanonicalName());
        log.debug("     Class: "+cacheManager.getClass().getCanonicalName());
        log.debug("     CacheNames: "+cacheManager.getCacheNames().stream().collect(Collectors.joining(", ")));
    }
}
