package com.tourbooking.backend.exception;

import lombok.Data;

import java.util.Date;

@Data
public class ErrorResponse {
    private Date date;
    private int status;
    private String error;
    private String message;
    private String patch;
}
