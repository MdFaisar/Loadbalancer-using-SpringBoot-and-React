package com.Tcf.PaymentServices;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pay")
public class PaymentController {

    @GetMapping("/")  // This maps to /pay/
    public String processPayment() {
        return "Payment Successful!";
    }
}