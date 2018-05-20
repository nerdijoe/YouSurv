package com.poll.controller;

import com.poll.persistence.dto.AppUserDTO;
import com.poll.service.UserService;
import com.poll.util.JsonSerializerUtil;
import com.poll.util.RestResponseConverter;
import org.hamcrest.Matchers;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(value = UserRestController.class, secure = false)
public class UserRestControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @InjectMocks
    private UserRestController userRestController;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(userRestController)
                .build();
    }

    @After
    public void tearDown() throws Exception {
    }



    @Test
    public void signin() throws Exception {
        AppUserDTO appUserDTO = new AppUserDTO("test@test.com", "test");

        when(userService.signin(any())).thenReturn("TEST_TOKEN");


        mockMvc.perform(
                post("/signin")
                    .contentType(MediaType.APPLICATION_JSON_UTF8)
                    .accept(MediaType.APPLICATION_JSON_UTF8)
                    .content(RestResponseConverter.convertToString(appUserDTO))
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token", Matchers.equalTo("TEST_TOKEN")))
                ;
    }

    @Test
    public void signup()  throws Exception {
        AppUserDTO appUserDTO = new AppUserDTO("test@test.com", "test");

        doNothing().when(userService).signup(any());

        mockMvc.perform(
                post("/signup")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8)
                        .content(RestResponseConverter.convertToString(appUserDTO))
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message", Matchers.equalTo("Successfully signup")))
        ;
    }

}