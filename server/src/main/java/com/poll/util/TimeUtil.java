package com.poll.util;

import com.poll.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

public class TimeUtil {
    private static final Logger log = LoggerFactory.getLogger(Application.class);


    public static final String format ="yyyy-MM-dd'T'HH:mm:ss";
    /**
     * @param dateString date in String format
     * @return Date format
     */
    public static Date getFlightDate(String dateString){
        return getSQLDateFromString(dateString, "yyyy-MM-dd-HH");
    }

    /**
     * @param dateString
     * @param formatString
     * @return Date format from date in String format using the defined format, example: "yyyy-MM-dd-HH"
     */
    private static Date getSQLDateFromString(String dateString, String formatString){
        SimpleDateFormat sdf = new SimpleDateFormat(formatString);
        java.sql.Date sqlDate = null;
        try {
            java.util.Date date = sdf.parse(dateString);
            sqlDate = new java.sql.Date(date.getTime());
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return sqlDate;
    }

}
