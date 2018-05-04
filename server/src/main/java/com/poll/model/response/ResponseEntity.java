package com.poll.model.response;

public class ResponseEntity {
    private String code;
    private String msg;

    public ResponseEntity(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public String getCode() {
        return code;
    }

    public String getMsg() {
        return msg;
    }
}
