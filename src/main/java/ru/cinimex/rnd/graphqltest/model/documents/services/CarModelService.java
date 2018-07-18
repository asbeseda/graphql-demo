package ru.cinimex.rnd.graphqltest.model.documents.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import ru.cinimex.rnd.graphqltest.model.documents.CarModel;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;

import java.util.ArrayList;
import java.util.List;

@Service
public class CarModelService {

    @Autowired private ManufacturerRepository manufacturerRepository;
    @Autowired private CarModelRepository carModelRepository;

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    public CarModel save(CarModel carModel){
        return carModelRepository.save(carModel);
    }

    @PreAuthorize("hasRole('ROLE_MODIFY')")
    public List<CarModel> saveAll(List<CarModel> carModels){
        return (List<CarModel>)carModelRepository.saveAll(carModels);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    public CarModel getCarModelById(String id){
        return carModelRepository.getCarModelById(id);
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    public List<CarModel> findAll(){
        return (List<CarModel>)carModelRepository.findAll();
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    public List<CarModel> findCarModelsByManufacturerId(String id){
        return carModelRepository.findCarModelsByManufacturer(new ObjectId(id));
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    public List<CarModel> findCarModelsByManufacturerName(String name){
        Manufacturer mf = manufacturerRepository.getManufacturerByName(name);
        if(mf==null)
            return new ArrayList<>();
        return carModelRepository.findCarModelsByManufacturer(mf.getId());
    }

    @PreAuthorize("hasRole('ROLE_READ')")
    public CarModel getCarModelByManufacturerIdAndName(String manufacturerid, String name){
        return carModelRepository.getCarModelByManufacturerAndName(new ObjectId(manufacturerid), name);
    }

}
