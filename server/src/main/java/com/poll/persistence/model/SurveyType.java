package com.poll.persistence.model;

public enum SurveyType {
    SV_GENERAL, SV_CLOSE, SV_OPEN;

    public static SurveyType getType(String type) {
        System.out.println("SurveyType.getType");
        System.out.println("type = " + type);
        for (SurveyType value: SurveyType.values()){
            System.out.println("value.name() = " + value.name());
            if (type.equalsIgnoreCase(value.name())){
                return value;
            }
        }
        return null;
    }
}
