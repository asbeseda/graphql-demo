package ru.cinimex.rnd.graphqltest.model.documents.services;

import org.bson.types.ObjectId;
import org.springframework.data.repository.PagingAndSortingRepository;
import ru.cinimex.rnd.graphqltest.model.documents.CarModel;

import java.util.List;

/* Is not public, can be used only in services from this package */
interface CarModelRepository extends PagingAndSortingRepository<CarModel, ObjectId> {
    CarModel getCarModelById(String id);

    List<CarModel> findCarModelsByManufacturer(ObjectId id);

    CarModel getCarModelByManufacturerAndName(ObjectId id, String name);

}
