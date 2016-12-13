<%@page import="org.piggy.core.i18n.ResourceUtil"%>

<%!
	String webRoot = "";

	public String getWebRoot(HttpServletRequest request) {
		String strWebRoot = request.getScheme() + "://" + request.getServerName();
		int port = request.getServerPort();
		if (port != 80) {
			strWebRoot += ":" + port;
		}
		strWebRoot += request.getContextPath() + "/";
		return strWebRoot;
	}

	public String getString(String resKey) {
		return ResourceUtil.getResource(resKey);
		//return "123";
	}
%>
<%
	webRoot = getWebRoot(request);
%>
<script type="text/javascript">
	var g_GlobalInfo = {};
	g_GlobalInfo.webRoot = "<%=webRoot%>";
	var addLabel = '<%=getString("COMMON.ADD")%>';
	var deleteLabel = '<%=getString("COMMON.DELETE")%>';
	var modifyLabel = '<%=getString("COMMON.MODIFY")%>';
	var okLabel = '<%=getString("COMMON.OK")%>';
	var cancelLabel = '<%=getString("COMMON.CANCEL")%>';
	var searchLabel = '<%=getString("COMMON.SEARCH")%>';
	var addIcon = g_GlobalInfo.webRoot+ 'images/portal/add.gif';
	var modifyIcon = g_GlobalInfo.webRoot+ 'images/portal/edit.png';
	var deleteIcon = g_GlobalInfo.webRoot+ 'images/portal/delete.gif';
	var configIcon = g_GlobalInfo.webRoot+ 'images/portal/config.png';
	var logoutIcon = g_GlobalInfo.webRoot+ 'images/portal/logout.png';
	var changePasswordIcon = g_GlobalInfo.webRoot+ 'images/portal/changePassword.png';
</script>

