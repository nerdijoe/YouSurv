package com.poll.controller;

import com.poll.persistence.dto.AppUserDTO;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.mapper.SurveyMapper;
import com.poll.persistence.model.AppUser;
import com.poll.persistence.model.Survey;
import com.poll.service.SurveyService;
import com.poll.service.UserService;
import com.poll.util.RestResponseConverter;
import org.hamcrest.Matchers;
import org.hibernate.service.spi.InjectService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.setup.MockMvcConfigurer;

import static org.junit.Assert.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
//@WebMvcTest(value = SurveyRestController.class, secure = false)
@SpringBootTest
public class SurveyRestControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private SurveyService surveyService;

    @MockBean
    private UserService userService;

    @InjectMocks
    private SurveyRestController surveyRestController;

    @MockBean
    private SurveyMapper surveyMapper;

    private AppUserDTO user;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(surveyRestController)
                .build();

        user = new AppUserDTO("test@test.com", "test");

    }

    @Test
    public void createSurvey() throws Exception {
        SurveyCreateDTO surveyCreateDTO = new SurveyCreateDTO("MySurvey", "general");
        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setSurveyorEmail(user.getEmail());

        assertTrue(surveyService != null);
        when(surveyService.createSurvey(any(), any())).thenReturn(surveyDTO);
        when(userService.getAuthName(any())).thenReturn(user.getEmail());
        when(userService.existsByEmail(anyString())).thenReturn(true);

        assertTrue(mockMvc != null);

        mockMvc.perform(
                post("/survey/")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8)
                        .content(RestResponseConverter.convertToString(surveyCreateDTO))
        )
                .andDo(print())
                .andExpect(status().isCreated())
//                .andReturn();
                .andExpect(jsonPath("$.surveyorEmail", Matchers.equalTo(user.getEmail())))
                ;
    }

    @Test
    public void saveSurvey() throws Exception {

        SurveyDTO surveyDTO = new SurveyDTO();
        surveyDTO.setSurveyorEmail(user.getEmail());


        Survey survey = new Survey();
        survey.setSurveyorEmail(user.getEmail());

        assertTrue(surveyService != null);
//        when(surveyService.createSurvey(any(), any())).thenReturn(surveyDTO);
//        when(userService.getAuthName(any())).thenReturn(user.getEmail());
        when(surveyService.existsById(anyLong())).thenReturn(true);
        when(surveyService.save(any())).thenReturn(survey);
        when(surveyMapper.toSurveyDTO(any())).thenReturn(surveyDTO);

        assertTrue(mockMvc != null);

        mockMvc.perform(
                put("/survey/1")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8)
                        .content(RestResponseConverter.convertToString(surveyDTO))
        )
                .andDo(print())
                .andExpect(status().isOk())
//                .andReturn();
                .andExpect(jsonPath("$.surveyorEmail", Matchers.equalTo(user.getEmail())))
        ;
    }

}