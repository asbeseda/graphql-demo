package ru.cinimex.rnd.graphqltest.model.documents.services;

import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;

/* Is not public, can be used only in services from this package */
interface ManufacturerRepository extends PagingAndSortingRepository<Manufacturer, ObjectId> {
    Manufacturer getManufacturerById(String id);
    Manufacturer getManufacturerByName(String name);
}
