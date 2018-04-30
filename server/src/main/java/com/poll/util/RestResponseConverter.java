package com.poll.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;

import java.util.Optional;

public class RestResponseConverter {

    public static String convertToString(Object object){
        String result = null;
        ObjectMapper mapper = new ObjectMapper();
        try{
            result =  mapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String convertToString(Object object, Optional<Boolean> xml, Optional<Class> viewCls){
        String result = null;
        ObjectMapper mapper;
        if (xml.isPresent() && xml.get()){
            mapper = new XmlMapper();
        } else{
            mapper = new ObjectMapper();
        }
        try {
            ObjectWriter writer;
            if(viewCls.isPresent()){
                result =  mapper
                        .writerWithView(viewCls.get())
                        .writeValueAsString(object);
            } else{
                result =  mapper
                        .writeValueAsString(object);
            }

        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return result;
    }

    public static String convertToString(Object object, Optional<Boolean> xml) {
        return convertToString(object, xml, Optional.empty());
    }

    public static String convertToString(Object object, Class viewCls){
        return convertToString(object, Optional.empty(), Optional.of(viewCls));
    }

    public static String convertToString(Object object, Optional<Boolean> xml, Class viewCls){
        return convertToString(object, xml, Optional.of(viewCls));
    }
}
