package com.poll.persistence.model;

public enum QuestionType {
    Q_STRING,
    MCQ_TEXT_RADIO,
    MCQ_TEXT_CHECKBOX,
    MCQ_TEXT_DROPDOWN,
    MCQ_IMAGE_RADIO,
    MCQ_IMAGE_CHECKBOX,
    STAR_RATING,
    Q_YESNO,
    Q_DATE,
    ;

    public static QuestionType getType(String type) {
        for (QuestionType value: QuestionType.values()){
            if (type.equalsIgnoreCase(value.name())){
                return value;
            }
        }
        return null;
    }
}
