package com.ssafy.aop;

import java.util.Arrays;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Aspect
@Slf4j
public class LoggingAspect {
	
	@Pointcut("execution(* com.**.controller..*.*(..)) || execution(* com.**.model..*.*(..))")
    public void mvc() {}
    
    @Before("mvc()")
    public void beforeCall(JoinPoint jp) {
        log.trace("호출:{}, 파라미터:{}", 
                jp.getSignature().toShortString(), 
                Arrays.toString( jp.getArgs() ));
    }
    
    @AfterReturning(pointcut = "mvc()", returning = "result")
    public void afterCall(JoinPoint jp, Object result) {
        log.trace("리턴:{}, 반환값:{}",
                jp.getSignature().toShortString(), 
                result);
    }
	
}
