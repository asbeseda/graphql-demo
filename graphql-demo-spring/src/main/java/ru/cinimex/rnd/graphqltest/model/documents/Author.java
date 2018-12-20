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
import java.util.List;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
@Document(collection = "authors")
public class Author {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @NotBlank
    @Indexed(name="idx_authors_name", unique=true)
    private String name;

    private String biography;

    @DBRef
    private List<Book> books;

    @Override
    public String toString() {
        return new StringBuilder()
            .append("{")
                .append("\"class\": \"").append(getClass().getSimpleName()).append("\", ")
                .append("\"id\": \"").append(id).append("\", ")
                .append("\"name\": \"").append(name).append("\",")
                .append("\"biography\": \"").append(biography).append("\",")
            .append("}")
        .toString();
    }

}
