package ru.cinimex.rnd.graphqltest;

import static org.junit.Assert.*;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.context.junit4.SpringRunner;
import ru.cinimex.rnd.graphqltest.model.documents.Author;
import ru.cinimex.rnd.graphqltest.model.documents.Book;
import ru.cinimex.rnd.graphqltest.model.services.mongo.BooksService;
import ru.cinimex.rnd.graphqltest.model.services.mongo.AuthorsService;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ModelDocumentsTest {

    @Autowired private AuthorsService authorsService;
    @Autowired private BooksService booksService;

    private static Author author_1;
    private static List<Book> author_1_books;

    @Test
    @WithUserDetails(value = "admin")
    public void t0010_addMongoDB_Author() {
        // Add Author
        author_1 = Author.builder().name("author_1").biography("author_1_biography").build();
        author_1 = authorsService.save(author_1);
        // Get Author by Id
        Author find_author = authorsService.findAuthorById(author_1.getId().toHexString());
        assertTrue("Find result must be not null", find_author!=null);
        assertTrue("Name for found author must be 'author_1'", find_author.getName().equals("author_1"));
        // Get Author by name
        find_author = authorsService.findAuthorByName("author_1");
        assertTrue("Find result must be not null", find_author!=null);
        assertTrue("Id for found author must be as created", find_author.getId().toHexString().equals(author_1.getId().toHexString()));
        assertTrue("Name for found author must be 'author_1'", find_author.getName().equals("author_1"));
    }

}
