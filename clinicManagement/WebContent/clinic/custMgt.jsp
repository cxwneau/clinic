<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>客户资料管理</title>

<!-- 引入ajax交互核心js以及界面组件核心js -->
<%@include file="/frm/inc/frm.inc"%>
<%@include file="/frm/inc/widget.inc"%>

<!-- 视情况引入jQuery -->


<!-- 本页面使用的js文件，推荐如下开发方式：其中一个js用于组织界面，另一个js负责业务逻辑 -->
<script type="text/javascript" src="custMgt.js"></script>
<script type="text/javascript" src="custMgtView.js"></script>

<!-- 本页面使用extjs插件 -->
<script type="text/javascript" src="<%=webRoot%>frm/extjs4/plugin/UploadPanel.js"></script>
<script type="text/javascript" src="<%=webRoot%>frm/otherWidget/swfupload.js"></script>

<!-- 本页面使用的css文件 -->
<link href="<%=webRoot%>frm/extjs4/plugin/UploadPanel.css" rel="stylesheet" type="text/css" />

</head>
<script type="text/javascript">
	var custName = '<%=getString("CUST_NAME")%>';
	var sex = '<%=getString("SEX")%>';
	var birthday = '<%=getString("BIRTHDAY")%>';
	var certificateType = '<%=getString("CERTIFICATE_TYPE")%>';
	var certificate = '<%=getString("CERTIFICATE")%>';
	var phoneNumber = '<%=getString("PHONENUMBER")%>';
	var custAddress = '<%=getString("CUST_ADDRESS")%>';
	var otherContact = '<%=getString("OTHER_CONTACTINFO")%>';
	var icon = '<%=getString("CUST_PHOTO")%>';
</script>
<body>
</body>
</html>