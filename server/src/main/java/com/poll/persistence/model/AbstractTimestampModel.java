package com.poll.persistence.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@MappedSuperclass
@Getter
@Setter
@ToString
public abstract class AbstractTimestampModel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    protected Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created", nullable = true)
    protected Date created;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated", nullable = true)
    protected Date updated;

    @PrePersist
    protected void onCreate() {
        updated = created = new Date();
        deleted = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updated = new Date();
    }

    @Column(name = "deleted", nullable = true)
    private boolean deleted;


}
