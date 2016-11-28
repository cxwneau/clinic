<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>诊所管理系统</title>

<!-- 引入ajax交互核心js以及界面组件核心js -->
<%@include file="/frm/inc/frm.inc"%>
<%@include file="/frm/inc/widget.inc"%>

<!-- 视情况引入jQuery -->
<script type="text/javascript" src="<%=webRoot%>frm/otherWidget/jquery.js"></script>

<!-- 本页面使用的js文件，推荐如下开发方式：其中一个js用于组织界面，另一个js负责业务逻辑 -->
<script type="text/javascript" src="portal.js"></script>
<script type="text/javascript" src="portalView.js"></script>

<!-- 本页面使用extjs插件 -->
<script type="text/javascript" src="<%=webRoot%>frm/extjs4/plugin/TabCloseMenu.js"></script>
<script type="text/javascript" src="<%=webRoot%>frm/extjs4/plugin/TabScrollerMenu.js"></script>

<!-- 本页面使用的css文件 -->
<link href="<%=webRoot%>css/portal/portal.css" rel="stylesheet" type="text/css" />
<link href="<%=webRoot%>frm/extjs4/plugin/TabScrollerMenu.css" rel="stylesheet" type="text/css" />

<%
	String op_id = request.getParameter("op_id");
%>
<script type="text/javascript">
	var op_id = <%=op_id%>;
</script>
</head>
<body>

</body>
</html>