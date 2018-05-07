package com.poll.util;

import com.poll.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Locale;

public class TimeUtil {
    private static final Logger log = LoggerFactory.getLogger(Application.class);


    /**
     * @param dateString
     * @param formatString
     * @return Date format from date in String format using the defined format, example: "yyyy-MM-dd-HH"
     */
    private static java.sql.Date getSQLDateFromString(String dateString, String formatString){
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


    /**
     * @param dateString
     * @param formatString yyyy.MM.dd HH:mm:ss
     * @return
     */
    public static java.util.Date getDateFromString(String dateString, String formatString){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern(formatString, Locale.ENGLISH);
        LocalDate localDate = LocalDate.parse(dateString, formatter);

        Date date = Date.from(localDate.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return date;
    }


}
