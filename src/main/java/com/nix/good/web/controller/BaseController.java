package com.nix.good.web.controller;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import java.util.HashMap;
import java.util.Map;

/**
 * @author 11723
 */
public class BaseController {
	public static final String SUCCESS = "SUCCESS";
	public static final String FAIL = "FAIL";
	private Map<String,Object> map = new HashMap<>();
	protected Gson gson = new GsonBuilder().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

	public BaseController render(String key,Object value) {
		map.put(key,value);
		return this;
	}
	public Map<String,Object> build() {
		return map;
	}



}
