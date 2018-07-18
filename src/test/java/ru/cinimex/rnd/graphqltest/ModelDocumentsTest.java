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
import ru.cinimex.rnd.graphqltest.model.documents.CarModel;
import ru.cinimex.rnd.graphqltest.model.documents.Manufacturer;
import ru.cinimex.rnd.graphqltest.model.documents.services.CarModelService;
import ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService;

import java.util.ArrayList;
import java.util.List;


@RunWith(SpringRunner.class)
@SpringBootTest
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class ModelDocumentsTest {

    @Autowired private ManufacturerService manufacturerService;
    @Autowired private CarModelService carModelService;

    private static Manufacturer mf_ty;
    private static List<CarModel> ty_models;

    @Test
    @WithUserDetails(value = "admin")
    public void t0010_addMongoDB_TY() {
        // Add Toyota manufacturer
        mf_ty = Manufacturer.builder().name("Toyota").description("").build();
        mf_ty = manufacturerService.save(mf_ty);
        // Get manufacturer by Id
        Manufacturer find_mf = manufacturerService.getManufacturerById(mf_ty.getId().toHexString());
        assertTrue("Find result must be not null", find_mf!=null);
        assertTrue("Name for found manufacturer must be 'Toyota'", find_mf.getName().equals("Toyota"));
        // Get manufacturer by name
        find_mf = manufacturerService.getManufacturerByName("Toyota");
        assertTrue("Find result must be not null", find_mf!=null);
        assertTrue("Id for found manufacturer must be as created", find_mf.getId().toHexString().equals(mf_ty.getId().toHexString()));
        assertTrue("Name for found manufacturer must be 'Toyota'", find_mf.getName().equals("Toyota"));
    }

    @Test
    @WithUserDetails(value = "admin")
    public void t0020_addMongoDB_TY_models() {
        // Add models for Toyota
        ty_models = new ArrayList<>();
        ty_models.add(CarModel.builder().name("Avensis").description("").manufacturer(mf_ty).build());
        ty_models.add(CarModel.builder().name("Camry").description("").manufacturer(mf_ty).build());
        carModelService.saveAll(ty_models);
        // Get Toyota models by manufacturer
        List<CarModel> find_ty_models = carModelService.findCarModelsByManufacturerId(mf_ty.getId().toHexString());
        assertTrue("Count of found models must be as created", find_ty_models.size()==ty_models.size());
        // Get Toyota models by manufacturer.name
        find_ty_models = carModelService.findCarModelsByManufacturerName("Toyota");
        assertTrue("Count of found models must be as created", find_ty_models.size()==ty_models.size());
    }

    @Test
    @WithUserDetails(value = "admin")
    public void t0030_addMongoDB_TY_models_add_to_manufacturer() {
        // Add models to manufacturer
        mf_ty.setCarModels(new ArrayList<>());
        mf_ty.getCarModels().addAll(ty_models);
        mf_ty = manufacturerService.save(mf_ty);
        // Get manufacturer by name
        Manufacturer find_mf = manufacturerService.getManufacturerByName("Toyota");
        assertTrue("Count of found models must be as created", find_mf.getCarModels().size()==ty_models.size());
    }

}
