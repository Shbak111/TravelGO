package com.ssafy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@EnableAspectJAutoProxy
public class TravelGoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TravelGoApplication.class, args);
	}

}
