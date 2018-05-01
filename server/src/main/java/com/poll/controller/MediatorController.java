package com.poll.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path="")
public class MediatorController {

    @GetMapping(path="/")
    public @ResponseBody
    String home() {
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
}
