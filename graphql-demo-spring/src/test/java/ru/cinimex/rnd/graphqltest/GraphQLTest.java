package ru.cinimex.rnd.graphqltest;

import com.jayway.restassured.http.ContentType;
import org.apache.commons.io.IOUtils;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.IOException;

import static com.jayway.restassured.RestAssured.given;

@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class GraphQLTest {

    @Test
    public void t0010_fillData() throws IOException {
        ClassLoader classLoader = getClass().getClassLoader();
        String new_author_1_json = IOUtils.toString(classLoader.getResourceAsStream("testdata/new_author_1.json"), "UTF-8");

        given()
            .header("Authorization", "Basic admin admin")
            .contentType(ContentType.JSON)
            .body(new_author_1_json)
            .log().all()
            .when().post("/graphql")
            .then()
            .log().all()
            .statusCode(200);
    }

}
