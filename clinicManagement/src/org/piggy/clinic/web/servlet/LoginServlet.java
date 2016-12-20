package org.piggy.clinic.web.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.piggy.core.common.Common;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.log.ServiceLoggingAspect;
import org.piggy.core.model.DynamicDict;
import org.piggy.core.services.ServiceFlow;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 用户登录 <br>
 * 
 * @author cxw <br>
 * @version 1.0, 2013-5-31 上午10:31:08<br>
 * @since JDK1.5 <br>
 */
public class LoginServlet extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static Logger Log = LoggerFactory.getLogger(ServiceLoggingAspect.class);

	private static final String LOGIN_PAGE = "login.jsp"; // 登录页面
	private static final String LOGIN_SUC = "clinic/portal.jsp";
	private static final String LOCAL_CHARSET = "utf-8";


	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		this.doPost(request, response);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding(LOCAL_CHARSET);
		String action = request.getParameter("action");
		String queryStr = request.getQueryString(); 
		// 非法登录
		if (queryStr == null || queryStr.indexOf("USERNAME") != -1 || queryStr.indexOf("PASSWORD") != -1) {
			response.sendRedirect(LOGIN_PAGE);
		}
		if ("login".equals(action)) {
			String username = request.getParameter("USERNAME");
			String password = request.getParameter("PASSWORD");
			String isRecord = request.getParameter("isRecord");
			Log.info("isRecord===>"+isRecord);
			try {
				DynamicDict dict = new DynamicDict();
				dict.setServiceName("VALIDATE_LOGIN");
				dict.set("LOGIN_NAME", username);
				dict.set("PASSWORD", password);
				ServiceFlow.callService(dict);
				String code = dict.getString("RETURN_CODE");
				if(code.equals("SUCCESS")){
					
					Map<String,String> map = new HashMap<String,String>();
					map.put("username",username);
					map.put("password",password);
					map.put("isRecord",isRecord);
					
					dealCookie(request,response, map);
					
					memberSession(request, response, dict);
					response.sendRedirect(LOGIN_SUC);
				}else{
					request.getSession().setAttribute("LOGIN_VALI_MESSAGE", code);
					response.sendRedirect(LOGIN_PAGE);
				}
				
			} catch (Exception e) {
				Log.error("Login Error:" + e.getMessage(), e);
				request.getSession().setAttribute("LOGIN_VALI_MESSAGE", "SYSTEM_ERROR");
				response.sendRedirect(LOGIN_PAGE);
			}
		} else if ("logout".equals(action)) {
			HttpSession session = request.getSession();
			session.invalidate();
			response.sendRedirect(LOGIN_PAGE);
		} else {
			response.sendRedirect(LOGIN_PAGE);
		}
	}

	private void dealCookie(HttpServletRequest request,HttpServletResponse response, Map<String, String> map) {
		String _isrecord = map.get("isRecord");
		if(StringUtils.isEmpty(_isrecord)){
			Cookie[] cookies= request.getCookies();
			for(Cookie cookie:cookies){
			cookie.setMaxAge(0);
			cookie.setPath("/");
			response.addCookie(cookie);
			}
			return;
		}
		
		//创建用户名Cookie对象
		Cookie cookieusername = new Cookie("username",map.get("username"));
		cookieusername.setMaxAge(60); //Cookie保存时间
		cookieusername.setPath("/");
		//创建用户密码Cookie对象
		Cookie cookiepassword = new Cookie("password",map.get("password"));
		cookiepassword.setMaxAge(60); //Cookie保存时间
		cookiepassword.setPath("/");
		Cookie cookieisrecord = new Cookie("isRecord",_isrecord);
		cookieisrecord.setMaxAge(60); //Cookie保存时间
		cookieisrecord.setPath("/");
		//添加到客户端
		response.addCookie(cookieusername);
		response.addCookie(cookiepassword);
		response.addCookie(cookieisrecord);
	}

	private void memberSession(HttpServletRequest request, HttpServletResponse response, DynamicDict userDict)
			throws BaseAppException, IOException {
		HttpSession session = request.getSession();
		if (session != null) {
			// 先判断一下用户的角色类型，取出所拥有的菜单权限
			DynamicDict dict = new DynamicDict();
			dict.set("OPERATOR_ID", userDict.getLong("OPERATOR_ID"));
			dict.setServiceName("QryOperatorMenus");
			ServiceFlow.callService(dict);
			List<Object> menuList = dict.getList(Common.Z_D_R);
			session.setAttribute("MENU_LIST", menuList);
			// 记录登录信息，session里也放一份
			String loginIp = request.getRemoteAddr();
			session.setAttribute("OPERATOR_ID", userDict.getLong("OPERATOR_ID"));
			session.setAttribute("LOGIN_NAME", userDict.getString("LOGIN_NAME"));
			session.setAttribute("LOGIN_IP", loginIp);
		}
	}

}
