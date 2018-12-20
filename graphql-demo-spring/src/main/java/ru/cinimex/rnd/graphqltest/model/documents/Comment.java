package ru.cinimex.rnd.graphqltest.model.documents;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data @Builder @AllArgsConstructor @NoArgsConstructor
@Document(collection = "comments")
public class Comment {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @DBRef
    private Book book;

    private String content;

    @Override
    public String toString() {
        return new StringBuilder()
            .append("{")
                .append("\"class\": \"").append(getClass().getSimpleName()).append("\", ")
                .append("\"id\": \"").append(id).append("\", ")
                .append("\"content\": \"").append(content).append("\",")
            .append("}")
        .toString();
    }

}
