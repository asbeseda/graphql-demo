package ru.cinimex.rnd.graphqltest.model.documents.services;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Aspect @Order(Ordered.HIGHEST_PRECEDENCE + 1)
@Component
@Slf4j
public class SecurityLogger {
    @Before(
        "execution(* ru.cinimex.rnd.graphqltest.model.documents.services.CarModelService.*(..)) ||"+
        "execution(* ru.cinimex.rnd.graphqltest.model.documents.services.ManufacturerService.*(..))"
    )
    public void logBeforeAllMethods(JoinPoint joinPoint) {
        if(!log.isTraceEnabled())
            return;

        String clazz = joinPoint.getTarget().getClass().getSimpleName();
        String method = joinPoint.getSignature().getName();
        SecurityContext securityCtx = SecurityContextHolder.getContext();

        String securityCtxStr="'UnAuthenticated'";
        if(securityCtx!=null){
            Authentication authentication = securityCtx.getAuthentication();
            if(authentication!=null)
                securityCtxStr = String.format("[User='%s', Authorities=%s]", authentication.getName(), authentication.getAuthorities().toString());
        }
        log.trace("Executing {}.{}() by {}", clazz, method, securityCtxStr);
    }

}
