package com.poll.persistence.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Survey extends AbstractTimestampModel {


    @ManyToOne(
            fetch = FetchType.LAZY
    )
    private AppUser surveyor;

    @ElementCollection(targetClass=String.class)
    private List<String> invitedEmailList;

    @Enumerated(EnumType.STRING)
    private SurveyType type;

    @OneToMany(
            fetch = FetchType.LAZY,
            mappedBy = "survey",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    private List<Question> questions;

    private boolean isPublished;

    public Survey(AppUser surveyor, SurveyType type) {
        super();
        this.surveyor = surveyor;
        this.invitedEmailList = new ArrayList<>();
        this.type = type;
        this.questions = new ArrayList<>();
        this.isPublished = false;
    }
}
