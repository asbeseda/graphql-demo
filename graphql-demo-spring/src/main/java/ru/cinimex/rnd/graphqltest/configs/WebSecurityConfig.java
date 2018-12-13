package ru.cinimex.rnd.graphqltest.configs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

import javax.annotation.PostConstruct;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
@Slf4j
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
            .antMatchers("/assets/**")
            .antMatchers("/webjars/**");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // Session will always be created if one doesn’t already exist
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS);

        // Disable CORS and CSRF
        http
            .cors().disable()
            .csrf().disable();

        // Permitions for resources
        http
            .httpBasic()
            .and()
            .authorizeRequests()
                .antMatchers("/graphql").authenticated()
                .antMatchers("/graphql_manual").authenticated()
                .antMatchers("/**").permitAll()
            .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
            .and()
                .logout()
                .permitAll();
    }

    @PostConstruct
    private void PostConstruct(){
        log.debug("Config executed: "+this.getClass().getCanonicalName());
    }
}