package com.tourbooking.backend.controller;

import com.tourbooking.backend.dto.passenger.PassengerResponse;
import com.tourbooking.backend.service.PassengerService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/passengers")
public class PassengerController {
    private final PassengerService passengerService;

    @GetMapping("")
    public ResponseEntity<Page<PassengerResponse>> getAllPassengers(@RequestParam(defaultValue = "1") int page, @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.status(HttpStatus.OK).body(passengerService.getAllPassengers(page,size));
    }
    @GetMapping("{id}")
    public ResponseEntity<PassengerResponse> getPassengerById(@PathVariable Long id) {
        return  ResponseEntity.status(HttpStatus.OK).body(passengerService.getPassengerById(id));
    }

}
