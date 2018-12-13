package ru.cinimex.rnd.graphqltest.graphql_manual;

import graphql.ExecutionResult;
import graphql.GraphQL;
import graphql.schema.DataFetcher;
import graphql.schema.DataFetchingEnvironment;
import graphql.schema.GraphQLSchema;
import graphql.schema.idl.RuntimeWiring;
import graphql.schema.idl.SchemaGenerator;
import graphql.schema.idl.SchemaParser;
import graphql.schema.idl.TypeDefinitionRegistry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;
import ru.cinimex.rnd.graphqltest.model.documents.services.CarModelService;
import ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class GraphQLService {
    @Value("classpath:schemas.graphqls")
    Resource schemaResource;

    @Autowired @Qualifier("df_manufacturers") private DataFetcher<List<Manufacturer>> df_manufacturers;

    private GraphQL graphQL;

    @PostConstruct
    public void createGraphQL() throws IOException {
        File schemaFile = schemaResource.getFile();
        TypeDefinitionRegistry typeDefinitionRegistry = new SchemaParser().parse(schemaFile);

        RuntimeWiring wiring = RuntimeWiring.newRuntimeWiring()
            .type("Query", typeWiring -> typeWiring
                .dataFetcher("manufacturers", df_manufacturers)
            )
            .build();

        GraphQLSchema graphQLSchema = new SchemaGenerator().makeExecutableSchema(typeDefinitionRegistry, wiring);
        graphQL = GraphQL.newGraphQL(graphQLSchema).build();
    }

    public ExecutionResult execute(String query) {
        return graphQL.execute(query);
    }

}
