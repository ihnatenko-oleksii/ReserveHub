package com.reservehub.reservehub.modules.reservation.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ReservationController {

    @PostMapping("/")
    String index(){
        return "index";
    }

    @GetMapping("/")
    String index1(){
        return "index";
    }
}
