package ru.cinimex.rnd.graphqltest.configs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;
import javax.servlet.MultipartConfigElement;

@Configuration
@EnableWebMvc
@Slf4j
public class WebMvcConfig extends WebMvcConfigurerAdapter {

    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setMaxFileSize("10MB");
        factory.setMaxRequestSize("10MB");
        return factory.createMultipartConfig();
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/assets/**").addResourceLocations("classpath:/static/assets/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");

    }
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index.html");
        registry.addViewController("/login").setViewName("login.html");
        registry.addViewController("/graphiql").setViewName("graphiql.html");
        registry.addViewController("/graphql-docs").setViewName("graphql-docs.html");
        registry.addViewController("/graphql-playground").setViewName("graphql-playground.html");
        registry.addViewController("/graphql-voyager").setViewName("graphql-voyager.html");
    }

    @PostConstruct
    private void PostConstruct(){
        log.debug("Config executed: "+this.getClass().getCanonicalName());
    }
}