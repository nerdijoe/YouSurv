package com.poll.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Survey extends AbstractTimestampEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    private AppUser surveyor;

    private List<String> invitedEmailList;

    private SurveyType type;

    private List<Question> questions;

    private boolean isPublished;

}
