package com.poll.controller;

import com.poll.persistence.dto.SurveyLinkDTO;
import com.poll.persistence.emailer.EmailService;
import com.poll.persistence.model.SurveyLinks;
import com.poll.persistence.repository.SurveyLinkRepository;
import com.poll.response.SurveyResponse;
import com.poll.service.SurveyLinkService;
import com.sun.net.httpserver.Authenticator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.*;
import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import sun.misc.IOUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
public class SurveyTypeController {

    @Autowired
    SurveyLinkService surveyLinkService;

    @Autowired
    private EmailService emailService;


    @Autowired
    private SurveyLinkRepository surveyLinkRepository;


    @PostMapping(value = "/publish")
    public org.springframework.http.ResponseEntity<?> publishSurvey(@RequestBody SurveyLinkDTO body) {
        String type = body.getType();
        SurveyResponse surveyResponse=new SurveyResponse();
        List<String> emailLists = body.getInvitedEmailList();
        String link="";
        String qr_img="";
        String url="";
        String domain="localhost:";
        String port="3000/";
        String route="takeSurvey?token=";

        SurveyLinks surveyLinks=new SurveyLinks();
        Date startDate =new Date();
        Date endDate=new Date();
        try {
            java.text.SimpleDateFormat simpleDateFormat1 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            startDate = simpleDateFormat1.parse(body.getStartDate());
            java.text.SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss");
            endDate=simpleDateFormat2.parse(body.getEndDate());
        }catch (ParseException e){
            System.out.println(e);

        }
        if(type.equals("general")){
            url=domain+port+route;
            String fileName=UUID.randomUUID().toString();
            link=url+fileName;
            surveyLinks.setSurveyId(body.getSurveyorId());
            surveyLinks.setLink(link);
            surveyLinks.setStartTime(startDate);
            surveyLinks.setEndTime(endDate);
            surveyLinks.setStatus("active");
            surveyResponse.setLink(link);
            //QR code Generation
            try {
                String qrCodeData = link;
                String filePath = "/QR_CODES/"+fileName+".png";
                String charset = "UTF-8"; // or "ISO-8859-1"

                Map < EncodeHintType, ErrorCorrectionLevel > hintMap = new HashMap < EncodeHintType, ErrorCorrectionLevel > ();
                hintMap.put(EncodeHintType.ERROR_CORRECTION, ErrorCorrectionLevel.L);
                BitMatrix matrix = new MultiFormatWriter().encode(
                        new String(qrCodeData.getBytes(charset), charset),
                        BarcodeFormat.QR_CODE, 200, 200, hintMap);
                MatrixToImageWriter.writeToFile(matrix, filePath.substring(filePath
                        .lastIndexOf('.') + 1), new File(filePath));
                InputStream in = getClass()
                        .getResourceAsStream(filePath);
                surveyResponse.setQr_img(org.apache.commons.io.IOUtils.toByteArray(in));
                System.out.println("QR Code image created successfully!");

            } catch (Exception e) {
                System.err.println(e);
            }

            surveyLinkService.createGeneralSurvey(surveyLinks);
        }
        else if(type.equals("closed")) {
            url=domain+port+route;
            link=url+UUID.randomUUID().toString();
            surveyLinks.setSurveyId(body.getSurveyorId());
            surveyLinks.setLink(link);
            surveyLinks.setStartTime(startDate);
            surveyLinks.setEndTime(endDate);
            surveyLinks.setStatus("active");

            //email the link
            SimpleMailMessage closedLink = new SimpleMailMessage();
            closedLink.setFrom("postmaster@localhost");
            closedLink.setTo(emailLists.get(0));
            closedLink.setSubject("Invitation to participate in Survey");
            closedLink.setText("To participate in the Survey, click the below link:\n" +
                "linkkkkkkk" + link);
            emailService.sendEmail(closedLink);

            surveyLinkService.createClosedSurvey(surveyLinks);
        }

        return  new org.springframework.http.ResponseEntity<SurveyResponse>(surveyResponse,HttpStatus.OK);
    }

    @GetMapping(value="/takeSurvey",produces = "application/json")
    public org.springframework.http.ResponseEntity<?> validateLink(@RequestParam String token){
        boolean isValid=true;
        try {
            SurveyLinks surveyLinks = surveyLinkRepository.findByLink("localhost:3000/takeSurvey?token=" + token);
            isValid = surveyLinkService.validate(token, surveyLinks);
            if (isValid) {
                return new org.springframework.http.ResponseEntity<Authenticator.Success>(HttpStatus.OK);
            } else {
                return new org.springframework.http.ResponseEntity<Authenticator.Failure>(HttpStatus.IM_USED);
            }

        }catch (Exception e){

        }
        return  null;
    }
}
