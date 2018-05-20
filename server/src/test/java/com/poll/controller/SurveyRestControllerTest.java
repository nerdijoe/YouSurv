package com.poll.controller;

import com.poll.persistence.dto.AppUserDTO;
import com.poll.persistence.dto.SurveyCreateDTO;
import com.poll.persistence.dto.SurveyDTO;
import com.poll.persistence.model.AppUser;
import com.poll.service.SurveyService;
import com.poll.util.RestResponseConverter;
import org.hamcrest.Matchers;
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
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.junit.Assert.*;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(value = SurveyRestController.class, secure = false)
public class SurveyRestControllerTest {

    private MockMvc mockMvc;

    @MockBean
    private SurveyService surveyService;

    @InjectMocks
    private SurveyRestController surveyRestController;

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

        assertTrue(surveyService != null);
        when(surveyService.createSurvey(user.getEmail(), surveyCreateDTO)).thenReturn(surveyDTO);

        MvcResult result = mockMvc.perform(
                post("/survey/")
                        .contentType(MediaType.APPLICATION_JSON_UTF8)
                        .accept(MediaType.APPLICATION_JSON_UTF8)
                        .content(RestResponseConverter.convertToString(surveyCreateDTO))
        )
                .andDo(print())
                .andExpect(status().isOk())
                .andReturn();
//                .andExpect(jsonPath("$.token", Matchers.equalTo("TEST_TOKEN")))

        String res = result.getResponse().getContentAsString();
        System.out.println("res = " + res);

    }


//    @Test
//    public void test() throws Exception {
//
//    }


}