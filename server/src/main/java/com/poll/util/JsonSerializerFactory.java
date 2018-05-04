package com.poll.util;

import com.fasterxml.jackson.databind.JsonSerializer;


/**
 * This factory class generates json serializer for each persistence response.
 */
public class JsonSerializerFactory {
    private static JsonSerializer jsonSerializer;

    /**
     * @param aClass the target class for serialization
     * @return customized serializer for the target class
     * @throws ClassNotFoundException when no customized serializer for that target class is found
     */
    public static JsonSerializer<?> get(Class<?> aClass) throws ClassNotFoundException {
        throw new ClassNotFoundException("No customized serializer founded for class: " + aClass);
    }
}
