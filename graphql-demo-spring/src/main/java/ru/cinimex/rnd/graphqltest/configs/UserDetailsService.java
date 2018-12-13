package ru.cinimex.rnd.graphqltest.configs;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
@Slf4j
public class UserDetailsService {

    @Bean("UserDetailsService")
    public org.springframework.security.core.userdetails.UserDetailsService userDetailsService() {
        log.debug("Bean initialing 'UserDetailsService'...");

        List<UserDetails> users = new ArrayList<>();
        users.add(User.withDefaultPasswordEncoder().username("admin").password("admin").roles("ADMIN", "READ", "MODIFY", "DELETE").build());
        users.add(User.withDefaultPasswordEncoder().username("user").password("user").roles().build());
        users.add(User.withDefaultPasswordEncoder().username("user-read").password("user").roles("READ").build());
        users.add(User.withDefaultPasswordEncoder().username("user-modify").password("user").roles("MODIFY").build());
        users.add(User.withDefaultPasswordEncoder().username("user-delete").password("user").roles("DELETE").build());

        users.stream().forEach(userDetails -> {
            log.debug("     user: {}, password: {}, roles: [{}]",
                userDetails.getUsername(),
                userDetails.getPassword(),
                userDetails.getAuthorities()
                    .stream().map(o -> ((GrantedAuthority) o).getAuthority())
                        .collect(Collectors.joining(", "))
            );
        });

        return new InMemoryUserDetailsManager(users);
    }
}
