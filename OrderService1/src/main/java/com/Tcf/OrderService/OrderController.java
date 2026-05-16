package com.Tcf.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping
    public String placeOrder() {
        try {
            // Use the exact name as registered in Eureka (all uppercase)
            String paymentServiceUrl = "http://PAYMENTSERVICES-1/pay/";
            String response = restTemplate.getForObject(paymentServiceUrl, String.class);
            return "Order Placed! Response from Payment: " + response;
        } catch (Exception e) {
            e.printStackTrace();
            return "Error placing order: " + e.getMessage();
        }
    }
    
}