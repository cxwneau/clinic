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
</script>

