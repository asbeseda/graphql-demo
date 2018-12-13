package ru.cinimex.rnd.graphqltest.model.documents;

import lombok.*;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
@Document(collection = "carModels")
public class CarModel {

    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @DBRef
    private Manufacturer manufacturer;

    @NotBlank
    @Indexed(name="idx_carModels_name", unique=true)
    private String name;

    private String description;

    @Override
    public String toString() {
        return new StringBuilder()
            .append("{")
                .append("\"class\": \"").append(getClass().getSimpleName()).append("\", ")
                .append("\"id\": \"").append(id).append("\", ")
                .append("\"manufacturer\": \"").append(manufacturer!=null ? manufacturer.getName() : null).append("\",")
                .append("\"name\": \"").append(name).append("\",")
            .append("}")
        .toString();
    }

}
