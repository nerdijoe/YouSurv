package com.poll.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Survey extends AbstractTimestampEntity {

    @ManyToOne(cascade = CascadeType.DETACH, fetch = FetchType.LAZY)
    private AppUser surveyor;

    @ElementCollection(targetClass=String.class)
    private List<String> invitedEmailList;

    private SurveyType type;

    @OneToMany(targetEntity=Question.class)
    private List<Question> questions;
    
    private boolean isPublished;

}
