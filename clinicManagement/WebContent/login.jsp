<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.ArrayList"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>诊所管理系统--登录</title>
<%@include file="/frm/inc/frm.inc"%>
<script type="text/javascript" src="<%=webRoot%>frm/otherWidget/jquery.js"></script>
<link href="<%=webRoot%>css/login/login.css" rel="stylesheet" type="text/css" />
</head>
<script type="text/javascript">
	$(document).ready(function() {
		$("#loginImage").mouseover(function() {
			$(this).css("border-color", "#94BAE5");
		});
		$("#loginImage").mouseout(function() {
			$(this).css("border-color", "transparent");
		});
		
		$("#USERNAME").bind("paste", function() {// 禁止用户名粘贴的行为
			return false;
		}).keypress(function(event) {
			checkLogin(event, 1);
		});

		$("#PASSWORD").bind("paste", function() {// 禁止用户密码粘贴的行为
			return false;
		}).keypress(function(event) {
			checkLogin(event, 2);
		});
		
		//回车
		function checkLogin(eve, t) {
			if (eve.keyCode == 13) {
				try {
					if (t == 1) {
						$("#PASSWORD").focus();
					} else if (t == 2) {
						doLogin(eve);
					} 
					eve.keyCode = 0;
				} catch (e) {
				}
				return;
			}
		};
		$("#USERNAME").focus();
	});
	 
	var plz_input_name='<%=getString("PLZ_INPUT_NAME")%>';
	var plz_input_password='<%=getString("PLZ_INPUT_PASSWORD")%>';
	function initPage(){
		initMsg();
	}

	function initMsg(){
		<%
		//从session中提取错误提示信息
		if(session.getAttribute("LOGIN_VALI_MESSAGE")!=null)
		{
		    String message = (String)session.getAttribute("LOGIN_VALI_MESSAGE");
		    Long tryUserId = (Long)session.getAttribute("TRY_USER_ID");
		    String errMessage;
		    if("ERROR_LICENSE".equals(message)){
		    	errMessage = "0";
		    }else if("PWD_EXPIRE".equals(message)){
		    	errMessage = "1";
		    }else if("WRONG_PASSWORD".equals(message)){
		    	errMessage = getString(message);
		    }else if("LICENSE_WILL_EXPIRE".equals(message)){
		    	errMessage = "2";
		    }else{
		    	errMessage = getString(message);
		    }
		%>
		var errStr='<%=errMessage%>';
		userId="<%=tryUserId%>";
		if(errStr=='0'){
		}else if(errStr=='1'){
		}else if(errStr=='2'){
		}else{
			G("errorLabel").innerHTML = '<%=errMessage%>';
		}
		<%
		 session.removeAttribute("LOGIN_VALI_MESSAGE");
		}
		%>
		
		
		<%
		//获取客户端Cookie数组
		Cookie[] cookies = request.getCookies();
		boolean bool = false;
		//预定义保存用户名和密码的变量
		String username = "";
		String password = "";
		if(cookies != null){
		for(Cookie cookie : cookies) {
		if("username".equals(cookie.getName())) username= cookie.getValue();
		if("password".equals(cookie.getName())) password= cookie.getValue();
		}%>
		 G("USERNAME").value = '<%=username%>';
		 G("PASSWORD").value ='<%=password%>';
		<%
		}
		%>
		
		// G("USERNAME").value = "admin";
		// alert(G("isRember").checked);
	
	}

	function G(id){
		return document.getElementById(id);
	}

	//点击OK按钮时触发
	function doLogin(){
		var username = G("USERNAME").value;
		var password = G("PASSWORD").value;
		 
		if (username == null || username == "") {
			G("USERNAME").focus();
			G("errorLabel").innerHTML = plz_input_name;
			return;
		} 
		if(password == null || password == ""){ 
			G("errorLabel").innerHTML = plz_input_password;
			G("PASSWORD").focus();
			return;
		}
		
		G("form").submit();
	} 
</script>
<body onload="initPage()">
	<form id="form" action="LoginServlet.do?action=login" method="post" onsubmit="return encrypt();">
		<div class="Main" >
			<ul >
				<li class="top"></li>
				<li class="top2"></li>
				<li class="topA"></li>
				<li class="topB"><span> <img
						src="<%=webRoot%>images/login/logo.png" alt="" style="" />
				</span></li>
				<li class="topC"></li>
				<li class="topD">
					<div id="errorLabel" class="error_label"></div>
					<ul class="login" style="margin-top: 20px">
						<li><span class="left">用户名：</span> <span style=""> <input
								id="USERNAME" name="USERNAME" type="text" value="${USERNAME}"  class="txt" />

						</span></li>
						<li><span class="left">密&nbsp;&nbsp;&nbsp;码：</span> <span
							style=""> <input id="PASSWORD" name="PASSWORD" type="password" value="${PASSWORD}"  class="txt" />
						</span></li>

						<li><span class="left">记住我：</span> <input id="isRember" name = "isRember"
							type="checkbox" /></li>

					</ul>
				</li>
				<li class="topE"></li>
				<li class="middle_A"></li>
				<li class="middle_B"></li>
				<li class="middle_C"><span class="btn"> <img id="loginImage"
						src="<%=webRoot%>images/login/btnlogin.gif" onclick="doLogin()" />


				</span></li>
				<li class="middle_D"></li>
				<li class="bottom_A"></li>
				<li class="bottom_B">版权所有2016，技术支持343854933@qq.com</li>
			</ul>
		</div>
	</form>
</body>
</html>