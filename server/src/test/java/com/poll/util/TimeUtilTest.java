package com.poll.util;

import org.junit.Test;

import java.util.Date;

import static org.junit.Assert.*;

public class TimeUtilTest {

    @Test
    public void dateToUTC() {
        String utcDateStr = "2018-05-20T02:30:33.000Z";
        Date local = TimeUtil.getDate(utcDateStr);
        Date utc = TimeUtil.dateToUTC(local);
        String localDateStr = TimeUtil.getDateString(utc);
        assertEquals(localDateStr, "2018-05-20T09:30:33.000Z");
    }
}