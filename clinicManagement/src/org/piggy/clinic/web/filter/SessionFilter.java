package org.piggy.clinic.web.filter;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.piggy.core.log.ServiceLoggingAspect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SessionFilter extends HttpServlet implements Filter {
	private static Logger Log = LoggerFactory.getLogger(ServiceLoggingAspect.class);
	private static final long serialVersionUID = -8214762754470838265L;
	private FilterConfig filterConfig;

	/**
	 * 不需要session校验的请求
	 */
	private String[] excludeFile = null;

	public void init(FilterConfig filterConfig) throws ServletException {
		this.filterConfig = filterConfig;
		String strExcludeFile = this.filterConfig.getInitParameter("ExcludeFile");
		if (strExcludeFile != null && strExcludeFile.trim().length() > 0) {
			excludeFile = strExcludeFile.split(",");
		}
	}

	@SuppressWarnings("unchecked")
	public void doFilter(ServletRequest srequest, ServletResponse sresponse, FilterChain filterChain)
			throws IOException {
		HttpServletRequest request = (HttpServletRequest) srequest;
		HttpServletResponse response = (HttpServletResponse) sresponse;
		try {
			HttpSession session = request.getSession();
			String requestStr = request.getRequestURL().toString();
			Log.debug("requestStr-->" + requestStr);
			if (requestStr.endsWith("/")) {
                requestStr = requestStr + "login.jsp";
            }

			// 不需要判断session的页面进行的前后台调用，直接给过
			if (excludeFile != null && excludeFile.length > 0) {
				for (int i = 0; i < excludeFile.length; i++) {
					if (requestStr.indexOf(excludeFile[i]) > 0) {
						filterChain.doFilter(request, response);
						return;
					}
				}
			}
			// 其他的调用，先看有没有登录，没有登录直接转到错误页面
			if (session == null || session.getAttribute("OPERATOR_ID") == null) {
				if (requestStr.indexOf("/callservice.do") > 0){
					request.setAttribute("SESSION_TIMEOUT", true);
					filterChain.doFilter(request, response);
					return;
				}else{
					response.sendRedirect(getWebRoot(request) + "error.jsp?ErrorFlag=1");
					return;
				}
			}
			// 如果登录了并且是callservice.do或者是访问portal.jsp，则直接给过
			if (requestStr.indexOf("/callservice.do") > 0 || requestStr.indexOf("/portal.jsp") > 0) {
				filterChain.doFilter(request, response);
				return;
			}
			// 如果登录了并且不是callservice.do，再看有没有菜单权限，没有权限直接转到错误页面
			List<Object> menuList = (List<Object>) request.getSession().getAttribute("MENU_LIST");
			for (Object  menu : menuList) {
				Map<String, Object> map = (Map<String, Object>) menu;
				if(requestStr.contains((String)map.get("URL"))){
					filterChain.doFilter(request, response);
					return;
				}
			}
			response.sendRedirect(getWebRoot(request) + "error.jsp?ErrorFlag=2");
		} catch (Exception bx) {
			response.sendRedirect(getWebRoot(request) + "error.jsp?ErrorFlag=3");
		}
	}

	public void destroy() {
	}

	
	public String getWebRoot(HttpServletRequest request) {
		String strWebRoot = "";
		if (strWebRoot == null || strWebRoot.length() == 0) {
			strWebRoot = request.getScheme();
			strWebRoot += "://";
			strWebRoot += request.getServerName();

			int port = request.getServerPort();
			if (port != 80) {
				strWebRoot += ":" + port;
			}

			strWebRoot += request.getContextPath() + "/";
		}
		return strWebRoot;
	}
}
