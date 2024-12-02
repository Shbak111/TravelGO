package com.ssafy.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.ssafy.interceptor.AuthInterceptor;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
	private final AuthInterceptor interceptor;
	
	@Override
	public void addCorsMappings(CorsRegistry registry) {
		// TODO Auto-generated method stub
		registry.addMapping("/**")
		.allowedOriginPatterns("*")
		.allowedMethods("GET","POST","PUT","DELETE","PATCH","OPTIONS")
		.allowedHeaders("Authorization", "UserId", "UserName")
		.allowCredentials(true);
	}
	
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// TODO Auto-generated method stub
		registry.addInterceptor(interceptor)
		.addPathPatterns("/myplans/**")
		.addPathPatterns("/plan-boards/**")
		.addPathPatterns("/badges/**")
		.addPathPatterns("/reviews/**")
		.addPathPatterns("/items/**")
		.addPathPatterns("/users/logout")
		.addPathPatterns("/users/check")
		.addPathPatterns("/users/mypage")
		.addPathPatterns("/users/write")
		.addPathPatterns("/ai/ask")
		.addPathPatterns("/stats/**");
	}
	
	@Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**")
                .addResourceLocations("classpath:/assets/")
                .setCachePeriod(0);
        
     // 외부 이미지 폴더 경로
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/")
                .setCachePeriod(0); // 캐시 비활성화
    }
}
