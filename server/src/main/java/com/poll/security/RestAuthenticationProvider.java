package com.poll.security;

import com.poll.model.User;
import com.sun.media.jfxmedia.logging.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
//public class RestAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {
public class RestAuthenticationProvider implements AuthenticationProvider {

    List<User> users;

    public RestAuthenticationProvider() {
        users = new ArrayList<>();
    }

    @PostConstruct
    void init(){
        users.add(new User("frank1.qjq@outlook.com", "123", "ROLE_ADMIN"));
        users.add(new User("frank2.qjq@outlook.com", "123", "ROLE_USER"));
        users.add(new User("frank3.qjq@outlook.com", "123", "ROLE_ANONYMOUS"));
    }

//    @Autowired
//    private UserDetailsService userDetailsService;

//    /**
//     * Sets the user details service.
//     *
//     * @param userDetailsService the user details service to set
//     */
//    @Autowired
//    public final void setUserDetailsService(UserDetailsService userDetailsService) {
//        this.userDetailsService = userDetailsService;
//    }

//    @Override
//    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
//
//    }

    @Override
    public final Authentication authenticate(Authentication authentication) {
        Assert.isInstanceOf(
                UsernamePasswordAuthenticationToken.class,
                authentication, "Only UsernamePasswordAuthenticationToken is supported");

        // Determine username
        String username = authentication.getName();
        String password = authentication.getCredentials().toString();

        System.out.println("username = " + username);
        System.out.println("password = " + password);
        Logger.logMsg(Logger.ERROR, "username = " + username);

        Optional<User> optionalUser = users.stream().filter(u -> u.auth(username, password)).findFirst();
        if (!optionalUser.isPresent()) {
            Logger.logMsg(Logger.ERROR, "Authentication failed for user = " + username);
            throw new BadCredentialsException("Authentication failed for user = " + username);
        }
        // find out the exited users
        List<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();
        grantedAuthorities.add(new SimpleGrantedAuthority(optionalUser.get().getRole()));
        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, password, grantedAuthorities);

        Logger.logMsg(Logger.INFO, "Succesful Authentication with user = " + username);
        return auth;


//        UserDetails user = null;
//        try {
//            user = retrieveUser(username, (UsernamePasswordAuthenticationToken) authentication);
//        } catch (ClassCastException | UsernameNotFoundException ex) {
//            throw new BadCredentialsException("Bad credentials");
//        }
//
//        Assert.notNull(user, "retrieveUser returned null - a violation of the interface contract");
//
//        return createSuccessAuthentication(user, authentication, user);
    }

    @Override
    public boolean supports(Class<?> authentication) {
//        return authentication.equals(
//                UsernamePasswordAuthenticationToken.class);
        return (UsernamePasswordAuthenticationToken.class
                .isAssignableFrom(authentication));
    }

//    @Override
//    protected final UserDetails retrieveUser(final String username, final UsernamePasswordAuthenticationToken authentication) {
//        UserDetails loadedUser;
//
//        if (userDetailsService == null) {
//            throw new IllegalStateException("userDetailsService must be set before using this!");
//        }
//
//        loadedUser = userDetailsService.loadUserByUsername(username);
//
//        if (loadedUser == null) {
//            throw new AuthenticationServiceException("User not valid");
//        }
//
//        return loadedUser;
//    }

}