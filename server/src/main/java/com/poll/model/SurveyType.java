package com.poll.model;

public enum SurveyType {
    GENERAL, CLOSE, OPEN;

    public static SurveyType getType(String type) {
        for (SurveyType value: SurveyType.values()){
            if (type.equalsIgnoreCase(value.name())){
                return value;
            }
        }
        return null;
    }
}
