package com.nix.good.web.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.nix.good.common.Role;
import com.nix.good.model.MemberModel;
import com.nix.good.util.MemberManager;
import org.mortbay.jetty.Response;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import java.lang.reflect.Method;

public class PermissionInterceptor implements HandlerInterceptor {
	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception exception) throws Exception {
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		if (handler instanceof HandlerMethod) {
			HandlerMethod handlerMethod = (HandlerMethod) handler;
			Method method = handlerMethod.getMethod();
			Role role = method.getAnnotation(Role.class);
			if (role != null) {
				int[] roles = role.value();
				MemberModel member = MemberManager.getCurrentUser(request);
				if (member == null) {
					response.sendError(Response.SC_UNAUTHORIZED,"权限不足");
					return false;
				}
				for (int r:roles) {
					if (member.getRole().getValue() == r) {
						return true;
					}
				}
				response.sendError(Response.SC_UNAUTHORIZED,"权限不足");
				return false;
			}
		}
		return true;
	}
}
