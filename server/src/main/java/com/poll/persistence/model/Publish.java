package com.poll.persistence.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class Publish{

    @Temporal(TemporalType.TIMESTAMP)
    private Date start;

    @Temporal(TemporalType.TIMESTAMP)
    private Date end;

    private String link;

    private String qrCodeByteArray;


}
