package com.poll.persistence.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Publish{

    private String link;

}
