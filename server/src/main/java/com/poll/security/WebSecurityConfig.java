package com.poll.security;

import com.poll.security.authentication.JwtTokenFilterConfigurer;
import com.poll.security.authentication.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    public WebSecurityConfig() { }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }



    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override

    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors().and()
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/signin").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/user/verify").permitAll()
                .antMatchers("/survey/token/**").permitAll()
                .antMatchers(HttpMethod.POST,"/savesubmitanswer/survey/**").permitAll()
                .antMatchers(HttpMethod.POST,"/survey/generate/openuniquelink").permitAll()
                .antMatchers(HttpMethod.PUT,"/survey/reroute/openuniquelink").permitAll()
                .antMatchers(HttpMethod.GET,"/survey/openUnique").permitAll()


//                .antMatchers("/anonymous").anonymous()
//                .antMatchers(HttpMethod.POST, "/user/").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .anyRequest().authenticated().and()
                .httpBasic().and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ;

//        http.exceptionHandling().accessDeniedPage("/403");

        http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));
    }


    @Override
    public void configure(WebSecurity webSecurity) throws Exception
    {
        webSecurity
                .ignoring()
                .antMatchers("/resources/**")
                .antMatchers(HttpMethod.OPTIONS, "/**");
    }


}
