package com.poll.security;

import com.poll.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@EnableWebSecurity
//@ComponentScan("com.poll.security")
@EnableGlobalMethodSecurity(prePostEnabled = true)
//@EnableGlobalMethodSecurity(prePostEnabled=false)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

//    private UserDetailsService userDetailsService;

//    @Autowired
//    private UserService userService;

    public WebSecurityConfig() { }

    @Bean(name = BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private JwtTokenProvider jwtTokenProvider;


//    @Autowired
//    private RestAuthenticationProvider restAuthenticationProvider;


//    @Override
//    protected void configure(
//            AuthenticationManagerBuilder auth) throws Exception {
//        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);
//    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }

//    @Autowired
//    @Override
//    protected void configure(
//            AuthenticationManagerBuilder auth) throws Exception {
////        auth.inMemoryAuthentication().withUser("admin").password("123").roles("ADMIN");
//        auth.authenticationProvider(restAuthenticationProvider);
//    }

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
        http.csrf().disable()
//                .addFilter(new JWTAuthenticationFilter(authenticationManager(), userService))
//                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager()), BasicAuthenticationFilter.class)
//                .addFilter(new JWTAuthorizationFilter(authenticationManager()))
                .authorizeRequests()
                .antMatchers("/").permitAll()
                .antMatchers("/login").permitAll()

                .antMatchers("/anonymous").anonymous()
                .antMatchers(HttpMethod.POST, "/user/").permitAll()
//                .antMatchers("/user/").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .httpBasic()
                .and()
//                .addFilterBefore(new JWTLoginFilter("/login", authenticationManager()),
//                        UsernamePasswordAuthenticationFilter.class)
                // And filter other requests to check the presence of JWT in header

//                .addFilterBefore(new JWTAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)
//                .addFilterBefore(new JWTAuthorizationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class)
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                ;

        http.exceptionHandling().accessDeniedPage("/403");

        http.apply(new JwtTokenFilterConfigurer(jwtTokenProvider));

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

    @Override
    public void configure(WebSecurity webSecurity) throws Exception
    {
        webSecurity
                .ignoring()
                .antMatchers("/resources/**")
                .antMatchers(HttpMethod.OPTIONS, "/**");
    }
}
