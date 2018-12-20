package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.cinimex.rnd.graphqltest.model.documents.Book;

/* Is not public, can be used only in services from this package */
interface BooksRepository extends PagingAndSortingRepository<Book, ObjectId> {
    Book getBookById(String id);
    Book getBookByTitle(String title);
}
