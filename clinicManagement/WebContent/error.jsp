<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%!String errorMsg = null;%>
<html>
	<head>
		<%
		%>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	    <%@include file="/frm/inc/frm.inc"%>
		<%
			String errorFlag = request.getParameter("ErrorFlag");
			  if ("1".equals(errorFlag)) { 
			      errorMsg = getString("SESSION_TIMEOUT");
			  }else if("2".equals(errorFlag)){
			      errorMsg = getString("NOT_ENOUGH_PRIV");
			  }else if("3".equals(errorFlag)){
			      errorMsg = getString("SYSTEM_ERROR");
			  }
		%>
		<title>出错啦！</title>
		<style type="text/css">
			body{
			    font-size:12px;
			    font-family: Verdana, Tahoma, Arial;
			    font-weight: bold;
			 	background-color: #E8F2FE;
			}
			
			#errorMsg{
				width:450px;  
				height:250px;  
				position:absolute;  
				left:50%;  
				top:30%;  
				margin:-175px 0 0 -300px; 
				text-align:center;
			    border:5px solid #317EB4;
			    border-radius:10px;
			    padding:3px 3px 3px 8px;
			    background-color: #ADD2ED;
			}
			
			#errorMsg .child {
			    padding-top: 20px;
			    float: top;
			    top: 20px;
			}
			#errorMsg a{
			    text-decoration:underline;
			    color:#414141;
			}
		</style>
	</head>
	<body>
		<div id="errorMsg">
				<div>
					<img src="<%=webRoot%>images/portal/error_logo.png" border="0"/>
				</div>
		<div style="color:red" class="child"><%=errorMsg%></div>
		<div class="child">您可以
			<a href="javascript:history.go(-1);" target="_parent">返回</a>
			或者
			<a href="login.jsp" target="_parent">重新登录</a>
		</div>
		</div>
	</body>
</html>