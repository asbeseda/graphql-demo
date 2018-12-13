package ru.cinimex.rnd.graphqltest.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.Cache;
import net.sf.ehcache.config.CacheConfiguration;
import net.sf.ehcache.statistics.StatisticsGateway;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class CustomResolver_Cache {

    /* RESOLVER - <Cache> */
    @Bean public GraphQLResolver<Cache> init_GraphQLResolver_Cache() {
        log.debug("GraphQLResolver bean initialing for <Cache>...");
        return new GraphQLResolver<Cache>(){
            /* RESOLVER - <Cache.configuration> */
            public CacheConfiguration configuration(Cache cache){
                return cache.getCacheConfiguration();
            }
            /* RESOLVER - <Cache.keys> */
            public List<String> keys(Cache cache){
                return cache.getKeys();
            }
        };
    }

    /* RESOLVER - <CacheStatistics>*/
    @Bean public GraphQLResolver<StatisticsGateway> init_GraphQLResolver_CacheStatistics() {
        log.debug("GraphQLResolver bean initialing for <CacheStatistics>...");
        return new GraphQLResolver<StatisticsGateway>(){
            /* RESOLVER - <CacheStatistics.cacheHitRatio> */
            public Double cacheHitRatio(StatisticsGateway statistic){
                return Double.valueOf(statistic.cacheHitRatio());
            }
        };
    }

}