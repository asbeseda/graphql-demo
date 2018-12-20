package ru.cinimex.rnd.graphqltest.model.services.mongo;

import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.cinimex.rnd.graphqltest.model.documents.Author;

/* Is not public, can be used only in services from this package */
interface AuthorsRepository extends PagingAndSortingRepository<Author, ObjectId> {
    Author getAuthorById(String id);
    Author getAuthorByName(String name);

}
