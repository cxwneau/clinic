var operMode = "add";

function doSearch(){
	Ext.getCmp("roleGrid").store.currentPage=1;
	Ext.getCmp("roleGrid").store.load({ params: { start: 0, limit: 15}});
}
function selectionchange( grid, selected, eOpts ){
	//先清空右边权限树
	Ext.getCmp("tree").store.setRootNode(null);
	if(selected && selected.length>0){
		Ext.getCmp("roleFieldset").loadRecord(selected[0]);
		btnEnable([true,true,true,true]);
		//加载右边权限树
		//1 module
		var param = {};
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
		param = {};
		param.ROLE_ID=Ext.getCmp("gridRoleId").value;
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
		Ext.getCmp('roleFieldset').getForm().reset();
		btnEnable([true,false,false,false]);
	}
}

function btnEnable(enableArray){
	for(var i=0;i<enableArray.length;i++){
		if(i==0){Ext.getCmp("addBtn").setDisabled(!enableArray[i])}
		if(i==1){Ext.getCmp("modifyBtn").setDisabled(!enableArray[i])}
		if(i==2){Ext.getCmp("deleteBtn").setDisabled(!enableArray[i])}
		if(i==3){Ext.getCmp("configBtn").setDisabled(!enableArray[i])}
	}
}


function itemdblclick( grid, record, item, index, e, eOpts ){
	alert(index);
}
function addBtnClick(){
	Ext.getCmp('winFieldset').getForm().reset();
	operMode = "add";
	Ext.getCmp("roleWin").setTitle("新增角色");
	Ext.getCmp("roleWin").show();
}
function modifyBtnClick(){
	Ext.getCmp('winFieldset').getForm().reset();
	Ext.getCmp("winFieldset").loadRecord(Ext.getCmp("roleGrid").getSelectionModel().getLastSelected());
	operMode = "modify";
	Ext.getCmp("roleWin").setTitle("修改角色");
	Ext.getCmp("roleWin").show();
}
function deleteBtnClick(){
	//先检查是否有实例数据，有的话就不让删除
	
	//执行删除
	Ext.MessageBox.confirm('', '你确定要删除这个角色吗？', function(btn){
		if(btn == "yes"){
			var inParam = {};
			inParam.ROLE_ID = Ext.getCmp("gridRoleId").value;
			try {
				callRemoteFunction("DELETE_ROLE", inParam);
				doSearch();
				Ext.MessageBox.alert('', "成功删除一条角色信息。");
			} catch (e) {
				alert(e.Desc);
			}
			
		}
	});
}

function configBtnClick(){
	Ext.getCmp("configTree").store.setRootNode(null);
	//加载当前role的菜单权限
	//1 module
	var param = {};
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
	param = {};
	param.ROLE_ID=Ext.getCmp("gridRoleId").value;
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
				menu.checked = false;
				for(var k=0;k<allRoleMenus.length;k++){
					if(allRoleMenus[k].MENU_ID == allMenus[j].MENU_ID){
						menu.checked = true;
						break;
					}
				}
				menus.push(menu);
			}
		}
		module.children = menus;
		children.push(module);
	}
	root.children = children;
	Ext.getCmp("configTree").store.setRootNode(root);
	Ext.getCmp("configWin").show();
}

function okBtnClick() {
	if(!Ext.getCmp('winFieldset').getForm().isValid()){return}
	
	var inParam = {};
	inParam.ROLE_NAME = Ext.getCmp("roleName").value;
	inParam.COMMENT = Ext.getCmp("comment").value;
	try {
		if(operMode=="add"){
			callRemoteFunction("ADD_ROLE", inParam);
		}
		if(operMode=="modify"){
			inParam.ROLE_ID=Ext.getCmp("roldId").value;
			callRemoteFunction("MODIFY_ROLE", inParam);
		}
		Ext.getCmp("roleWin").hide();
		//选中新增的这一行
		Ext.getCmp("roleGrid").store.load({ params: { start: 0, limit: 15},
		    	callback: function(records, operation, success) {
		    				if(records && records.length>0){
			    				var model = Ext.getCmp("roleGrid").getSelectionModel();
								model.select(0);
		    				}
						}
		    	});
		if(operMode=="add"){
			Ext.MessageBox.alert('', "成功新增一条角色信息。");
		}
		if(operMode=="modify"){
			Ext.MessageBox.alert('', "成功修改一条角色信息。");
		}
		
	} catch (e) {
		alert(e.Desc);
	}
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
    			rel.ROLE_ID = Ext.getCmp("gridRoleId").value;
    			rel.MENU_ID = rec.get('id');
				rels.push(rel);
			});
	var inParam = {};
	inParam.ROLE_ID = Ext.getCmp("gridRoleId").value;
	inParam.RELS = rels;
	try {
		callRemoteFunction("MODIFY_ROLE_MENU_REL", inParam);
		//选中新增或修改的这一行
		Ext.getCmp("configWin").hide();
		selectionchange( Ext.getCmp("roleGrid"), Ext.getCmp("roleGrid").getSelectionModel().getSelection());
	} catch (e) {
		alert(e.Desc);
	}
}