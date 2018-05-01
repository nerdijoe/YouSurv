package com.poll.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;


@Configuration
@EnableWebSecurity
@ComponentScan("com.poll.security")
@EnableGlobalMethodSecurity(prePostEnabled=false)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    private RestAuthenticationProvider restAuthenticationProvider;

    @Autowired
    @Override
    protected void configure(
            AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(restAuthenticationProvider);
    }

//    private static String REALM = "MY_TEST_REALM";
//
//    @Autowired
//    public void configureGlobalSecurity(AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication().withUser("bill").password("abc123").roles("ADMIN");
//        auth.inMemoryAuthentication().withUser("tom").password("abc123").roles("USER");
//
//    }
//
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/anonymous").anonymous()
                .antMatchers("/user/").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and().
                sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().
                csrf().disable();
        ;
        http.exceptionHandling().accessDeniedPage("/403");

//                .and()
////                .formLogin()
////                .loginPage("/login")
////                .permitAll()
////                .and()
////                .logout()
////                .permitAll()
//                ;
//
//
//
////        http.csrf().disable()
////                .authorizeRequests()
////                .antMatchers("/home/**").hasRole("ADMIN")
////                .and().httpBasic().realmName(REALM).authenticationEntryPoint(getBasicAuthEntryPoint())
////                .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);//We don't need sessions to be created.
    }
//
//    @Bean
//    public CustomBasicAuthenticationEntryPoint getBasicAuthEntryPoint(){
//        return new CustomBasicAuthenticationEntryPoint();
//    }
////
//    /* To allow Pre-flight [OPTIONS] request from browser */
//    @Override
//    public void configure(WebSecurity web) throws Exception {
//        web.ignoring().antMatchers(HttpMethod.OPTIONS, "/**");
//    }
}
