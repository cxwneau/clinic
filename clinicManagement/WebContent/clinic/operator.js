var operMode = "add";

function doSearch(){
	Ext.getCmp("operatorGrid").store.currentPage=1;
	Ext.getCmp("operatorGrid").store.load({ params: { start: 0, limit: 10}});
}
function selectionchange( grid, selected, eOpts ){
	if(selected && selected.length>0){
		Ext.getCmp("operatorFieldset").loadRecord(selected[0]);
		btnVisible([true,true,true,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	}else{
		Ext.getCmp('operatorFieldset').getForm().reset();
		btnVisible([true,false,false,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	}
}

function btnVisible(visibleArray){
	for(var i=0;i<visibleArray.length;i++){
		if(i==0){Ext.getCmp("addBtn").setVisible(visibleArray[i])}
		if(i==1){Ext.getCmp("modifyBtn").setVisible(visibleArray[i])}
		if(i==2){Ext.getCmp("deleteBtn").setVisible(visibleArray[i])}
		if(i==3){Ext.getCmp("okBtn").setVisible(visibleArray[i])}
		if(i==4){Ext.getCmp("cancelBtn").setVisible(visibleArray[i])}
	}
}


function itemdblclick( grid, record, item, index, e, eOpts ){
	alert(index);
}
function addBtnClick(){
	Ext.getCmp('operatorFieldset').getForm().reset();
	btnVisible([false,false,false,true,true]);
	Ext.getCmp("basicInfo").setDisabled(false);
	operMode = "add";
}
function modifyBtnClick(){
	btnVisible([false,false,false,true,true]);
	Ext.getCmp("basicInfo").setDisabled(false);
	operMode = "modify";
}
function deleteBtnClick(){
	//先检查是否有实例数据，有的话就不让删除
	
	//执行删除
	Ext.MessageBox.confirm('', '你确定要删除这个操作员吗？', function(btn){
		if(btn == "yes"){
			var inParam = {};
			inParam.OPERATOR_ID = Ext.getCmp("operatorId").value;
			try {
				callRemoteFunction("DELETE_OPERATOR", inParam);
				doSearch();
				Ext.MessageBox.alert('', "成功删除一条操作员信息。");
			} catch (e) {
				alert(e.Desc);
			}
			
		}
	});
	
}
function okBtnClick() {
	if(!Ext.getCmp('operatorFieldset').getForm().isValid()){return}
	//获取数据
	var inParam = {};
	inParam.OPERATOR_NAME = Ext.getCmp("operatorName").value;
	inParam.PHONE = Ext.getCmp("phone").value;
	inParam.EMAIL = Ext.getCmp("email").value;
	inParam.LOGIN_NAME = Ext.getCmp("loginName").value;
	inParam.PASSWORD = Ext.getCmp("password").value;
	inParam.COMMENT = Ext.getCmp("comment").value;
	try {
		if(operMode=="add"){
			callRemoteFunction("ADD_OPERATOR", inParam);
		}
		if(operMode=="modify"){
			inParam.OPERATOR_ID=Ext.getCmp("operatorId").value;
			callRemoteFunction("MODIFY_OPERATOR", inParam);
		}
		//选中新增或修改的这一行
		Ext.getCmp("operatorGrid").store.load({ params: { start: 0, limit: 15},
		    		callback: function(records, operation, success) {
		    					if(records && records.length>0){
			    					var model = Ext.getCmp("operatorGrid").getSelectionModel();
									model.select(0);
		    					}
							}
		    		});
		if(operMode=="add"){
			Ext.MessageBox.alert('', "成功新增一条操作员信息。");
		}
		if(operMode=="modify"){
			Ext.MessageBox.alert('', "成功修改一条操作员信息。");
		}
		
	} catch (e) {
		alert(e.Desc);
	}
}
function cancelBtnClick(){
	 var selectedData=Ext.getCmp("operatorGrid").getSelectionModel().getSelection();
	 if(selectedData && selectedData.length>0){
	 	Ext.getCmp("operatorFieldset").loadRecord(selectedData[0]);
		btnVisible([true,true,true,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }else{
	 	Ext.getCmp('operatorFieldset').getForm().reset();
	 	btnVisible([true,false,false,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }
}