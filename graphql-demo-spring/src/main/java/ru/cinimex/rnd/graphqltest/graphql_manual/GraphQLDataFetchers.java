package ru.cinimex.rnd.graphqltest.graphql_manual;

import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;
import ru.cinimex.rnd.graphqltest.model.documents.services.CarModelService;
import ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService;

import java.util.List;

@Component
@Slf4j
public class GraphQLDataFetchers {

    @Autowired private ApplicationContext appContext;
    @Autowired private ManufacturerService manufacturerService;
    @Autowired private CarModelService carModelService;

    @Bean(name = "df_manufacturers")
    public DataFetcher<List<Manufacturer>> df_manufacturers(){
        log.debug("DataFetcher bean initialing for <List<Manufacturer>>...");
        return new DataFetcher() {
            @Override
            public List<Manufacturer> get(DataFetchingEnvironment env) {
                return manufacturerService.findAll();
            }
        };
    }

}
