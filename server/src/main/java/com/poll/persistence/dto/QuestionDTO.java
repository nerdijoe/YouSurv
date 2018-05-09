package com.poll.persistence.dto;

import com.poll.persistence.model.QuestionOption;
import lombok.*;
import org.hibernate.annotations.ManyToAny;

import java.util.List;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class QuestionDTO {
    private String id;
    private String type;
    private String text;
    private String image;
    private List<QuestionOption> options;
    private boolean required;
    private String created;
    private String updated;
    private boolean deleted;

}
