package com.poll.persistence.model;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
public abstract class AbstractTimestampModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", nullable = false)
    private Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated", nullable = false)
    private Date updated;

    @PrePersist
    protected void onCreate() {
        updated = created = new Date();
        isDeleted = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    @Column(name = "isDeleted", nullable = false)
    private boolean isDeleted;


    public Long getId(){
        return id;
    }
}
