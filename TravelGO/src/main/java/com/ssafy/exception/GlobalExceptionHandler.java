package com.ssafy.exception;
import java.util.HashMap;
import java.util.Map;

import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.BadSqlGrammarException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.server.ResponseStatusException;

@ControllerAdvice
public class GlobalExceptionHandler {

    // 400 - Bad Request
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<Map<String, String>> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Bad Request");
        errorResponse.put("message", "Invalid format");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }
    
    // 특정 예외 처리
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<Map<String, String>> handleResponseStatusException(ResponseStatusException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getStatusCode().toString());
        errorResponse.put("message", ex.getReason());
        return ResponseEntity.status(ex.getStatusCode()).body(errorResponse);
    }
    
    // 500 - Internal Server Error
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneralException(Exception ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Internal Server Error");
        String message = (ex.getMessage() != null && !ex.getMessage().isEmpty()) 
                ? ex.getMessage() 
                : "An unexpected error occurred";
        errorResponse.put("message", message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
    
    // 500 - DataAccess Error
    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<Map<String, String>> handleDataAccessException(Exception ex) {
    	Map<String, String> errorResponse = new HashMap<>();
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR; // 기본 상태 코드

        if (ex instanceof DuplicateKeyException) {
            status = HttpStatus.CONFLICT; // 409: 중복된 리소스가 있을 때
            errorResponse.put("message", "Duplicate key error: Duplicate entry exists.");
        } else if (ex instanceof DataIntegrityViolationException) {
            status = HttpStatus.BAD_REQUEST; // 400: 데이터 무결성 위반
            errorResponse.put("message", "Data integrity violation: Constraint issues.");
        } else if (ex instanceof BadSqlGrammarException) {
            status = HttpStatus.BAD_REQUEST; // 400: 잘못된 SQL 구문
            errorResponse.put("message", "SQL syntax error: Check your SQL syntax.");
        } else if (ex instanceof IncorrectResultSizeDataAccessException) {
            status = HttpStatus.INTERNAL_SERVER_ERROR; // 500: 결과 크기 불일치
            errorResponse.put("message", "Incorrect result size: Expected a single result but found multiple.");
        } else {
            // 그 외 DataAccessException의 기본 처리
            errorResponse.put("message", "An unexpected database error occurred");
        }

        errorResponse.put("error", "Database Error");
        return ResponseEntity.status(status).body(errorResponse);
    }
}
