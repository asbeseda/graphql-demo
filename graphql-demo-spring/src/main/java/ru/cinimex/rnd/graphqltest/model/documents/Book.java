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
@Document(collection = "books")
public class Book {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @DBRef
    private Author author;

    @NotBlank
    @Indexed(name="idx_books_title", unique=true)
    private String title;

    @NotBlank
    private String releaseDate;

    private String description;

    @DBRef
    private List<Comment> comments;

    @Override
    public String toString() {
        return new StringBuilder()
            .append("{")
                .append("\"class\": \"").append(getClass().getSimpleName()).append("\", ")
                .append("\"id\": \"").append(id).append("\", ")
                .append("\"author\": \"").append(author).append("\", ")
                .append("\"title\": \"").append(title).append("\",")
                .append("\"releaseDate\": \"").append(releaseDate).append("\",")
                .append("\"description\": \"").append(description).append("\",")
            .append("}")
        .toString();
    }

}
