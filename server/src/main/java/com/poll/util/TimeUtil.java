package com.poll.util;

import com.poll.Application;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.TimeZone;

public class TimeUtil {
    private static final Logger log = LoggerFactory.getLogger(Application.class);

//    private static final String DATE_FORMAT = "yyyy-MM-dd HH:mm:ss";
    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'";

    /**
     * @param dateString
     * @return
     */
    public static Date getDate(String dateString, String formatString){
        Date date = null;
        SimpleDateFormat sdf = new SimpleDateFormat(formatString);
        if(dateString!=null && !dateString.isEmpty()) {
            try {
                date = sdf.parse(dateString);
            } catch (ParseException e) {
                e.printStackTrace();
            }
        }
        return date;
    }

    public static Date getDate(String dateString){
        return getDate(dateString, DATE_FORMAT);
    }

    public static String getDateString(Date date){
        Format formatter = new SimpleDateFormat(DATE_FORMAT);
        String dateString = null;

        if(date!=null) {
            try {
                dateString = formatter.format(date);
            } catch (IllegalArgumentException e) {
                e.printStackTrace();
            }
        }
        return dateString;
    }

    public static Date dateFromUTC(Date date){
        return new Date(date.getTime() + Calendar.getInstance().getTimeZone().getOffset(date.getTime()));
    }

    public static Date dateToUTC(Date date){
        return new Date(date.getTime() - Calendar.getInstance().getTimeZone().getOffset(date.getTime()));
    }
}
