package ru.cinimex.rnd.graphqltest.graphql_manual;

import graphql.ExecutionResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GraphQLRestController {
    @Autowired
    GraphQLService graphQLService;

    @PostMapping(value = "/graphql_manual")
    public ResponseEntity<Object> graphql(@RequestBody String query) {
        ExecutionResult result = graphQLService.execute(query);
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
}
