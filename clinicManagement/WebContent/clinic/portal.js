//单击模块按钮，在左侧导航区创建模块下的菜单
function createModuleMenu(module) {
	var param = {};
	param.OPERATOR_ID = op_id;
	param.MODULE_ID = module.MODULE_ID;
	var retMenus = [];
	try {
		retMenus = callRemoteQueryFunction("QueryOpModuleMenu", param);
	} catch (e) {
		Ext.MessageBox.alert('Alert', e.Desc);
	}
	//构造菜单dom
	var $menu_container = $('<div class="container"></div>');
	var $menu_box = $('<div class="leftsidebar_box"></div>');
	var $menu_dl = $('<dl></dl>');
	var $menu_dt = $('<dt style='+'"background-image: url('+g_GlobalInfo.webRoot
					+ module.ICON.split(".")[0]+'_small'+"."+ module.ICON.split(".")[1]+')">'
					+ module.MODULE_NAME
					+'<img src="'+ g_GlobalInfo.webRoot+ 'images/portal/left/select_xl01.png"></dt>');
	$menu_dl.append($menu_dt);
	$menu_box.append($menu_dl);
	$menu_container.append($menu_box);
	for (var i = 0; i < retMenus.length; i++) {
		var $menu_dd = $('<dd><a href="javascript:void(0)" onclick="clickMenu('
				+ "'" 
				+ retMenus[i].MENU_ID+";"
				+ retMenus[i].URL+";"
				+ retMenus[i].ICON+";"
				+ retMenus[i].MENU_NAME+ "'" + ')">' + retMenus[i].MENU_NAME
				+ '</a></dd>');
				
		$menu_dl.append($menu_dd);
	}
	
	var htmlStr = $menu_container[0].outerHTML;
	var menuPanel = Ext.getCmp("menuPanel");
	menuPanel.update(htmlStr);
}


function clickMenu(menu) {
	var values = menu.split(";");
	// 动态加载菜单对应的界面到tab页
	if(Ext.getCmp("tab_id_"+values[0])){
		Ext.getCmp("mainTabs").setActiveTab(Ext.getCmp("tab_id_"+values[0]));
	}else{
		Ext.getCmp("mainTabs").add({
				id:"tab_id_"+values[0],
				title: values[3],
		        icon:g_GlobalInfo.webRoot+values[2],
		        closable: true,
		        html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+g_GlobalInfo.webRoot+values[1]+'"> </iframe>'
			}).show();
	}
}
