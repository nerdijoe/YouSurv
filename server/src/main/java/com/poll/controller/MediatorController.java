package com.poll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@Controller
@RequestMapping(path="")
public class MediatorController {

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path="/")
    public @ResponseBody
    String home() {
        System.out.println("MediatorController.home");
        return "Home Page";

    }

    @GetMapping(path="/anonymous")
    public @ResponseBody
    String anonymous() {
        return "Anonymous Page";
    }

    @GetMapping(path="/test")
    public @ResponseBody
    String test() {
        return "Test Auth page";
    }

    @RequestMapping(method = RequestMethod.OPTIONS, value="/**")
    public void manageOptions(HttpServletResponse response)
    {
        //do things
        System.out.println("MediatorController.manageOptions");
    }
}
