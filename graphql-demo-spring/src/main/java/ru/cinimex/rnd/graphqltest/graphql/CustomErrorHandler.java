package ru.cinimex.rnd.graphqltest.graphql;

import graphql.ErrorType;
import graphql.ExceptionWhileDataFetching;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import graphql.servlet.GraphQLErrorHandler;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CustomErrorHandler {

    @Bean
    public GraphQLErrorHandler errorHandler() {
        log.debug("Bean initialing 'GraphQLErrorHandler'...");

        return new GraphQLErrorHandler() {
            @Override
            public List<GraphQLError> processErrors(List<GraphQLError> errors) {
                List<GraphQLError> clientErrors =
                    errors.stream()
                        .filter(this::isClientError)
                        .collect(Collectors.toList());

                List<GraphQLError> serverErrors =
                    errors.stream()
                        .filter(e -> !isClientError(e))
                        .map(CustomErrorAdapter::new)
                        .collect(Collectors.toList());

                List<GraphQLError> e = new ArrayList<>();
                e.addAll(clientErrors);
                e.addAll(serverErrors);
                return e;
            }

            protected boolean isClientError(GraphQLError error) {
                return !(error instanceof ExceptionWhileDataFetching || error instanceof Throwable);
            }
        };
    }

    class CustomErrorAdapter implements GraphQLError {

        private GraphQLError error;

        public CustomErrorAdapter(GraphQLError error) {this.error = error;}

        @Override public Map<String, Object> getExtensions() {return error.getExtensions();}
        @Override public List<SourceLocation> getLocations() {return error.getLocations();}
        @Override public ErrorType getErrorType() {return error.getErrorType();}
        @Override public List<Object> getPath() {return error.getPath();}
        @Override public Map<String, Object> toSpecification() {return error.toSpecification();}

        @Override
        public String getMessage() {
            if(error instanceof ExceptionWhileDataFetching)
                return ((ExceptionWhileDataFetching) error).getException().getMessage();
            else
                return error.getMessage();
        }
    }
}