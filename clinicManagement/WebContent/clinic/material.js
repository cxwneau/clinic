var operMode = "add";

function doSearch(){
	Ext.getCmp("materialGrid").store.currentPage=1;
	Ext.getCmp("materialGrid").store.load({ params: { start: 0, limit: 15}});
}
function selectionchange( grid, selected, eOpts ){
	if(selected && selected.length>0){
		Ext.getCmp("materialFieldset").loadRecord(selected[0]);
		btnVisible([true,true,true,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	}else{
		Ext.getCmp('materialFieldset').getForm().reset();
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
	Ext.getCmp('materialFieldset').getForm().reset();
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
	Ext.MessageBox.confirm('', '你确定要删除这个物品吗？', function(btn){
		if(btn == "yes"){
			var inParam = {};
			inParam.MATERIAL_ID = Ext.getCmp("materialId").value;
			try {
				callRemoteFunction("DELETE_MATERIAL", inParam);
				doSearch();
				Ext.MessageBox.alert('', "成功删除一条物品信息。");
			} catch (e) {
				alert(e.Desc);
			}
			
		}
	});
	
}
function okBtnClick() {
	if(!Ext.getCmp('materialFieldset').getForm().isValid()){return}
	//获取数据
	var inParam = {};
	inParam.MATERIAL_NO = Ext.getCmp("materialName").value;
	inParam.MODEL = Ext.getCmp("model").value;
	if(Ext.getCmp("price").value){
		inParam.MATERIAL_PRICE = Math.round(Ext.getCmp("price").value*100);
	}
	
	inParam.NUMBER = Ext.getCmp("useTime").value;
	try {
		if(operMode=="add"){
			callRemoteFunction("ADD_MATERIAL", inParam);
		}
		if(operMode=="modify"){
			inParam.MATERIAL_ID=Ext.getCmp("materialId").value;
			callRemoteFunction("MODIFY_MATERIAL", inParam);
		}
		//选中新增或修改的这一行
		Ext.getCmp("materialGrid").store.load({ params: { start: 0, limit: 15},
		    		callback: function(records, operation, success) {
		    					if(records && records.length>0){
			    					var model = Ext.getCmp("materialGrid").getSelectionModel();
									model.select(0);
		    					}
							}
		    		});
		if(operMode=="add"){
			Ext.MessageBox.alert('', "成功新增一条物品信息。");
		}
		if(operMode=="modify"){
			Ext.MessageBox.alert('', "成功修改一条物品信息。");
		}
		
	} catch (e) {
		alert(e.Desc);
	}
}
function cancelBtnClick(){
	 var selectedData=Ext.getCmp("materialGrid").getSelectionModel().getSelection();
	 if(selectedData && selectedData.length>0){
	 	Ext.getCmp("materialFieldset").loadRecord(selectedData[0]);
		btnVisible([true,true,true,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }else{
	 	Ext.getCmp('materialFieldset').getForm().reset();
	 	btnVisible([true,false,false,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }
}