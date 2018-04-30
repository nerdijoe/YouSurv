package com.poll.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import com.fasterxml.jackson.dataformat.xml.XmlMapper;


/**
 * This class provide static method to serialize object
 */
public class JsonSerializerUtil{
    /**
     * @param aClass the target class for serialization
     * @param xml boolean value indicating result to be false(JSON)/ true(XML)
     * @return intended object mapper
     */
    private static ObjectMapper getMapper(Class<?> aClass, boolean xml) {
        ObjectMapper mapper = xml ? new XmlMapper() : new ObjectMapper();
        try {
            SimpleModule module = new SimpleModule();
            module.addSerializer(JsonSerializerFactory.get(aClass));
            mapper.registerModule(module);
        } catch (ClassNotFoundException e) {
            //do nothing, just use default mapper
        }
        return mapper;
    }

    /**
     * @param object the object to be serialized
     * @param aClass the target class for serialization
     * @param xml boolean value indicating result to be false(JSON)/ true(XML)
     * @return serialized string
     */
    public static String toString(Object object, Class<?> aClass, boolean xml) {
        String string = null;
        try{
            ObjectMapper mapper = getMapper(aClass, xml);
            string = mapper.writeValueAsString(object);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }
        return string;
    }
}
