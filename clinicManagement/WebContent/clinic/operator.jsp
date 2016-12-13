<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>操作员管理</title>

<!-- 引入ajax交互核心js以及界面组件核心js -->
<%@include file="/frm/inc/frm.inc"%>
<%@include file="/frm/inc/widget.inc"%>

<!-- 视情况引入jQuery -->


<!-- 本页面使用的js文件，推荐如下开发方式：其中一个js用于组织界面，另一个js负责业务逻辑 -->
<script type="text/javascript" src="operator.js"></script>
<script type="text/javascript" src="operatorView.js"></script>

<!-- 本页面使用extjs插件 -->


<!-- 本页面使用的css文件 -->

</head>
<script type="text/javascript">
	var operatorName = '<%=getString("OPERATOR_NAME")%>';
	var phone = '<%=getString("PHONE")%>';
	var email = '<%=getString("EMAIL")%>';
	var loginName = '<%=getString("LOGIN_NAME")%>';
	var password = '<%=getString("PASSWORD")%>';
	var comment = '<%=getString("COMMENT")%>';
</script>
<body>
</body>
</html>