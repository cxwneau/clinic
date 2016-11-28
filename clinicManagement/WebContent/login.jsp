<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
	});
</script>
<body>
	<form id="form1">
		<div class="Main">
			<ul>
				<li class="top"></li>
				<li class="top2"></li>
				<li class="topA"></li>
				<li class="topB"><span> <img
						src="<%=webRoot%>images/login/logo.png" alt="" style="" />
				</span></li>
				<li class="topC"></li>
				<li class="topD">
					<ul class="login">
						<li><span class="left">用户名：</span> <span style=""> <input
								id="Text1" type="text" class="txt" />

						</span></li>
						<li><span class="left">密&nbsp;&nbsp;&nbsp;码：</span> <span
							style=""> <input id="Text2" type="text" class="txt" />
						</span></li>
						<li><span class="left">验证码：</span> <span style=""> <input
								id="Text3" type="text" class="txtCode" />
						</span></li>

						<li><span class="left">记住我：</span> <input id="Checkbox1"
							type="checkbox" /></li>

					</ul>
				</li>
				<li class="topE"></li>
				<li class="middle_A"></li>
				<li class="middle_B"></li>
				<li class="middle_C"><span class="btn"> <img id="loginImage"
						src="<%=webRoot%>images/login/btnlogin.gif" onclick="login()" />


				</span></li>
				<li class="middle_D"></li>
				<li class="bottom_A"></li>
				<li class="bottom_B">版权所有2016，技术支持123@126.com</li>
			</ul>
		</div>
	</form>
</body>
</html>