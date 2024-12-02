package com.ssafy.config;

import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;

//Swagger-UI 확인
//http://localhost:8080/swagger-ui/index.html

@Configuration
public class SwaggerConfiguration {

	@Bean
	public OpenAPI openAPI() {
		System.out.println("openAPI-------------");
		Info info = new Info().title("TravelGO API 명세서").description(
				"<h3>TravelGO API Reference for Developers</h3>Travel API<br>")
				.version("v1").contact(new io.swagger.v3.oas.models.info.Contact().name("travelGO")
						.email("").url(""));

		return new OpenAPI().components(new Components()).info(info);
	}
	
	@Bean
	public GroupedOpenApi attractionApi() {
		return GroupedOpenApi.builder().group("attractions").pathsToMatch("/attractions/**").build();
	}
	@Bean
	public GroupedOpenApi badgeApi() {
		return GroupedOpenApi.builder().group("badges").pathsToMatch("/badges/**").build();
	}
	@Bean
	public GroupedOpenApi itemApi() {
		return GroupedOpenApi.builder().group("items").pathsToMatch("/items/**").build();
	}
	@Bean
	public GroupedOpenApi myplanApi() {
		return GroupedOpenApi.builder().group("myplans").pathsToMatch("/myplans/**").build();
	}
	@Bean
	public GroupedOpenApi planBoardApi() {
		return GroupedOpenApi.builder().group("planboards").pathsToMatch("/plan-boards/**").build();
	}
	@Bean
	public GroupedOpenApi reviewApi() {
		return GroupedOpenApi.builder().group("reviews").pathsToMatch("/reviews/**").build();
	}
	@Bean
	public GroupedOpenApi userApi() {
		return GroupedOpenApi.builder().group("users").pathsToMatch("/users/**").build();
	}
	
	

}