package com.poll.response;

public class SurveyResponse {

    String link=null;
    byte[] qr_img;

    public String getLink() {
        return link;
    }



    public void setLink(String link) {
        this.link = link;
    }

    public byte[] getQr_img() {
        return qr_img;
    }

    public void setQr_img(byte[] qr_img) {
        this.qr_img = qr_img;
    }
}
