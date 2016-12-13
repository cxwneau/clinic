var operMode = "add";

function doSearch(){
	Ext.getCmp("operatorGrid").store.currentPage=1;
	Ext.getCmp("operatorGrid").store.load({ params: { start: 0, limit: 15}});
}
function selectionchange( grid, selected, eOpts ){
	//先清空右边权限树
	Ext.getCmp("tree").store.setRootNode(null);
	Ext.getCmp("roleGrid").store.removeAll();
	if(selected && selected.length>0){
		btnEnable([true]);
		//加载角色数据
		//重新设置数据
		var param = {};
		param.OPERATOR_ID=selected[0].data.OPERATOR_ID;
		var ret = [];
		try {
			ret = callRemoteQueryFunction("QueryRolesByOperator", param);
		} catch (e) {
			Ext.MessageBox.ERROR('错误', e.Desc);
		}
		Ext.getCmp("roleGrid").store.add(ret);
		//加载右边权限树
		//1 module
		param = {};
		var allModules = [];
		try {
			allModules = callRemoteQueryFunction("QueryAllModules", param);
		} catch (e) {
			Ext.MessageBox.alert('错误', e.Desc);
			return;
		}
		
		//2 menu
		param = {};
		var allMenus = [];
		try {
			allMenus = callRemoteQueryFunction("QueryAllMenus", param);
		} catch (e) {
			Ext.MessageBox.alert('错误', e.Desc);
			return;
		}
		//3 role menu
		var operatorRoles = [];
		for(var i=0;i<ret.length;i++){
			operatorRoles.push(ret[i].ROLE_ID);
		}
		param = {};
		param.ROLE_ID = operatorRoles.length>0?operatorRoles:0;
		var allRoleMenus = [];
		try {
			allRoleMenus = callRemoteQueryFunction("QueryRoleMenus", param);
		} catch (e) {
			Ext.MessageBox.alert('错误', e.Desc);
			return;
		}
		//4  组合
		var root = {expanded: true}
		var children = [];
		for(var i=0;i<allModules.length;i++){
			var module = {};
			module.text = allModules[i].MODULE_NAME;
			module.leaf = false;
			module.expanded = true;
			var menus = [];
			for(var j=0;j<allMenus.length;j++){
				if(allMenus[j].MODULE_ID == allModules[i].MODULE_ID){
					var menu = {};
					menu.id = allMenus[j].MENU_ID;
					menu.text = allMenus[j].MENU_NAME;
					menu.leaf = true;
					for(var k=0;k<allRoleMenus.length;k++){
						if(allRoleMenus[k].MENU_ID == allMenus[j].MENU_ID){
							menus.push(menu);
							break;
						}
					}
				}
			}
			module.children = menus;
			if(module.children.length>0){
				children.push(module);
			}
		}
		root.children = children;
		Ext.getCmp("tree").store.setRootNode(root);
	}else{
		btnEnable([false]);
	}
}

function btnEnable(enableArray){
	for(var i=0;i<enableArray.length;i++){
		if(i==0){Ext.getCmp("configBtn").setDisabled(!enableArray[i])}
	}
}

function configBtnClick(){
	Ext.getCmp("configTree").store.setRootNode(null);
	//1 role
	var param = {};
	var allRoles = [];
	try {
		allRoles = callRemoteQueryFunction("QueryRole", param);
	} catch (e) {
		Ext.MessageBox.alert('错误', e.Desc);
		return;
	}
	//2 operator role
	param = {};
	param.OPERATOR_ID=Ext.getCmp("operatorGrid").getSelectionModel().getSelection()[0].data.OPERATOR_ID;
	var allOperatorRoles = [];
	try {
		allOperatorRoles = callRemoteQueryFunction("QueryOperatorRoles", param);
	} catch (e) {
		Ext.MessageBox.alert('错误', e.Desc);
		return;
	}
	//3  组合
	var root = {expanded: true}
	var children = [];
	for(var i=0;i<allRoles.length;i++){
		var role = {};
		role.id = allRoles[i].ROLE_ID;
		role.text = allRoles[i].ROLE_NAME;
		role.leaf = true;
		role.checked = false;
		for(var j=0;j<allOperatorRoles.length;j++){
			if(allOperatorRoles[j].ROLE_ID == allRoles[i].ROLE_ID){
				role.checked = true;
				break;
			}
		}
		children.push(role);
	}
	root.children = children;
	Ext.getCmp("configTree").store.setRootNode(root);
	Ext.getCmp("configWin").show();
}

function cancelBtnClick(){
	Ext.getCmp("roleWin").hide();
}
function cancelClick(){
	Ext.getCmp("configWin").hide();
}
function okClick(){
	//找出选中所有选中的菜单
	var records = Ext.getCmp("configTree").getView().getChecked();
    var rels = [];
    Ext.Array.each(records, function(rec) {
    			var rel = {};
    			rel.OPERATOR_ID = Ext.getCmp("operatorGrid").getSelectionModel().getSelection()[0].data.OPERATOR_ID;
    			rel.ROLE_ID = rec.get('id');
				rels.push(rel);
			});
	var inParam = {};
	inParam.OPERATOR_ID = Ext.getCmp("operatorGrid").getSelectionModel().getSelection()[0].data.OPERATOR_ID;
	inParam.RELS = rels;
	try {
		callRemoteFunction("MODIFY_OPERATOR_ROLE_REL", inParam);
		//选中新增或修改的这一行
		Ext.getCmp("configWin").hide();
		selectionchange( Ext.getCmp("operatorGrid"), Ext.getCmp("operatorGrid").getSelectionModel().getSelection());
	} catch (e) {
		alert(e.Desc);
	}
}