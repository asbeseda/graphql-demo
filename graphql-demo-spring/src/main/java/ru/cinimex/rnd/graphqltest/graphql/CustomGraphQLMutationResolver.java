package ru.cinimex.rnd.graphqltest.graphql;

import com.coxautodev.graphql.tools.GraphQLMutationResolver;
import graphql.GraphQLException;
import lombok.extern.slf4j.Slf4j;
import net.sf.ehcache.Cache;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Component;
import ru.cinimex.rnd.graphqltest.model.documents.Author;
import ru.cinimex.rnd.graphqltest.model.documents.Book;
import ru.cinimex.rnd.graphqltest.model.documents.Comment;
import ru.cinimex.rnd.graphqltest.model.services.mongo.AuthorsService;
import ru.cinimex.rnd.graphqltest.model.services.mongo.BooksService;
import ru.cinimex.rnd.graphqltest.model.services.mongo.CommentsService;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class CustomGraphQLMutationResolver implements GraphQLMutationResolver {

    @Autowired private AuthorsService authorsService;
    @Autowired private BooksService booksService;
    @Autowired private CommentsService commentsService;

    public CustomGraphQLMutationResolver(){
        log.debug("GraphQLResolver bean initialing for <Mutation>...");
    }

    /////////////////////////////////////////////////////////////
    // AUTHORS
    /////////////////////////////////////////////////////////////
    public Author createAuthor(String id, String name, String biography) {
        Author newAuthor =
            Author.builder()
                .id(new ObjectId(id))
                .name(name)
                .biography(biography)
            .build();
        return authorsService.create(newAuthor);
    }

    public Author changeAuthor(String id, String name, String biography) {
        Author oldAuthor = authorsService.findAuthorById(id);
        if(oldAuthor==null)
            throw new GraphQLException("Author to change not found.");
        oldAuthor.setName(name);
        oldAuthor.setBiography(biography);
        return authorsService.change(oldAuthor);
    }

    public boolean deleteAuthor(String id) {
        Author oldAuthor = authorsService.findAuthorById(id);
        if(oldAuthor==null)
            throw new GraphQLException("Author to delete not found.");
        authorsService.delete(oldAuthor.getId());
        return true;
    }


    /////////////////////////////////////////////////////////////
    // BOOKS
    /////////////////////////////////////////////////////////////
    public Book createBook(String id, String authorId, String title, String releaseDate, String description) {
        Author author = authorsService.findAuthorById(authorId);
        if(author==null)
            throw new GraphQLException("Author for book not found.");
        Book newBook =
            Book.builder()
                .id(new ObjectId(id))
                .author(author)
                .title(title)
                .releaseDate(releaseDate)
                .description(description)
            .build();
        return booksService.create(newBook);
    }

    public Book changeBook(String id, String authorId, String title, String releaseDate, String description) {
        Book oldBook = booksService.findBookById(id);
        if(oldBook==null)
            throw new GraphQLException("Book to change not found.");
        if(authorId!=null){
            Author author = authorsService.findAuthorById(authorId);
            if(author==null)
                throw new GraphQLException("Author for book not found.");
            oldBook.setAuthor(author);
        }
        oldBook.setTitle(title);
        oldBook.setReleaseDate(releaseDate);
        oldBook.setDescription(description);
        return booksService.change(oldBook);
    }

    public boolean deleteBook(String id) {
        Book oldBook = booksService.findBookById(id);
        if(oldBook==null)
            throw new GraphQLException("Book to delete not found.");
        booksService.delete(oldBook.getId());
        return true;
    }

    /////////////////////////////////////////////////////////////
    // COMMENTS
    /////////////////////////////////////////////////////////////
    public Comment createComment(String id, String bookId, String content) {
        Book book = booksService.findBookById(bookId);
        if(book==null)
            throw new GraphQLException("Book not found.");
        Comment newComment =
            Comment.builder()
                .id(new ObjectId(id))
                .book(book)
                .content(content)
            .build();
        return commentsService.create(newComment);
    }

    public Comment changeComment(String id, String content) {
        Comment oldComment = commentsService.findCommentById(id);
        if(oldComment==null)
            throw new GraphQLException("Comment to change not found.");
        oldComment.setContent(content);
        return commentsService.change(oldComment);
    }

    public boolean deleteComment(String id) {
        Comment oldComment = commentsService.findCommentById(id);
        if(oldComment==null)
            throw new GraphQLException("Comment to delete not found.");
        commentsService.delete(oldComment.getId());
        return true;
    }

}

