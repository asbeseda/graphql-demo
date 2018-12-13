package ru.cinimex.rnd.graphqltest.graphql;

import com.coxautodev.graphql.tools.GraphQLResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.cinimex.rnd.graphqltest.graphql.enums.DeleteConfirm;
import ru.cinimex.rnd.graphqltest.model.documents.CarModel;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;
import ru.cinimex.rnd.graphqltest.model.documents.services.CarModelService;
import ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService;

@Component
@Slf4j
public class CustomResolver_Manufacturer implements GraphQLResolver<Manufacturer> {
    @Autowired private ManufacturerService manufacturerService;
    @Autowired private CarModelService carModelService;

    public CustomResolver_Manufacturer(){
        log.debug("GraphQLResolver bean initialing for <Manufacturer>...");
    }

    /* RESOLVER - <Manufacturer.update()> */
    public Manufacturer update(Manufacturer current, Manufacturer update) {
        if(update.getName()!=null)
            current.setName(update.getName());
        if(update.getDescription()!=null)
            current.setDescription(update.getDescription());
        return manufacturerService.save(current);
    }

    /* RESOLVER - <Manufacturer.delete()> */
    public boolean delete(Manufacturer current, DeleteConfirm confirm) {
        if(!confirm.equals(DeleteConfirm.SURE))
            return false;
        manufacturerService.delete(current.getId());
        return true;
    }

    /* RESOLVER - <Manufacturer.carModel()> */
    public CarModel carModel(Manufacturer current, String name) {
        return carModelService.getCarModelByManufacturerIdAndName(current.getId().toHexString(), name);
    }
}
