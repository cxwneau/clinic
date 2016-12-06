var operMode = "add";

function doSearch(){
	Ext.getCmp("custGrid").store.currentPage=1;
	Ext.getCmp("custGrid").store.load({ params: { start: 0, limit: 10}});
}
function selectionchange( grid, selected, eOpts ){
	if(selected && selected.length>0){
		Ext.getCmp("custFieldset").loadRecord(selected[0]);
		Ext.getCmp("birthSelector").setValue(selected[0].data.BIRTHDAY.substr(0,10));
		btnVisible([true,true,true,false,false]);
		Ext.getCmp("basicInfo").setDisabled(true);
	}else{
		Ext.getCmp('custFieldset').getForm().reset();
		btnVisible([true,false,false,false,false]);
		//Ext.getCmp("photo").setDisabled(true);
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
	Ext.getCmp('custFieldset').getForm().reset();
	btnVisible([false,false,false,true,true]);
	//Ext.getCmp("photo").setDisabled(false);
	Ext.getCmp("basicInfo").setDisabled(false);
	operMode = "add";
}
function modifyBtnClick(){
	btnVisible([false,false,false,true,true]);
	//Ext.getCmp("photo").setDisabled(false);
	Ext.getCmp("basicInfo").setDisabled(false);
	operMode = "modify";
}
function deleteBtnClick(){
	//先检查是否有实例数据，有的话就不让删除
	
	//执行删除
	Ext.MessageBox.confirm('', '你确定要删除这个用户吗？', function(btn){
		if(btn == "yes"){
			var inParam = {};
			inParam.CUST_ID = Ext.getCmp("custId").value;
			try {
				callRemoteFunction("DELETE_CUSTOMER", inParam);
				doSearch();
				Ext.MessageBox.alert('', "成功删除一条客户信息。");
			} catch (e) {
				alert(e.Desc);
			}
			
		}
	});
	
}
function okBtnClick() {
	if(!Ext.getCmp('custFieldset').getForm().isValid()){return}
	//获取数据
	var inParam = {};
	inParam.CUST_NAME = Ext.getCmp("custName").value;
	inParam.SEX = Ext.getCmp("sex").value;
	inParam.BIRTHDAY = Ext.util.Format.date(Ext.getCmp("birthSelector").value,'Y-m-d 00:00:00');
	inParam.PHONENUMBER = Ext.getCmp("phoneNumber").value;
	inParam.CUST_ADDRESS = Ext.getCmp("custAddress").value;
	inParam.OTHER_CONTACTINFO = Ext.getCmp("otherContact").value;
	try {
		if(operMode=="add"){
			callRemoteFunction("ADD_CUSTOMER", inParam);
		}
		if(operMode=="modify"){
			inParam.CUST_ID=Ext.getCmp("custId").value;
			callRemoteFunction("MODIFY_CUSTOMER", inParam);
		}
		//选中新增或修改的这一行
		Ext.getCmp("custGrid").store.load({ params: { start: 0, limit: 10},
		    		callback: function(records, operation, success) {
		    					if(records && records.length>0){
			    					var model = Ext.getCmp("custGrid").getSelectionModel();
									model.select(0);
		    					}
							}
		    		});
		if(operMode=="add"){
			Ext.MessageBox.alert('', "成功新增一条客户信息。");
		}
		if(operMode=="modify"){
			Ext.MessageBox.alert('', "成功修改一条客户信息。");
		}
		
	} catch (e) {
		alert(e.Desc);
	}
}
function cancelBtnClick(){
	 var selectedData=Ext.getCmp("custGrid").getSelectionModel().getSelection();
	 if(selectedData && selectedData.length>0){
	 	Ext.getCmp("custFieldset").loadRecord(selectedData[0]);
		Ext.getCmp("birthSelector").setValue(selectedData[0].data.BIRTHDAY.substr(0,10));
		btnVisible([true,true,true,false,false]);
		//Ext.getCmp("photo").setDisabled(true);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }else{
	 	Ext.getCmp('custFieldset').getForm().reset();
	 	btnVisible([true,false,false,false,false]);
	 	//Ext.getCmp("photo").setDisabled(true);
		Ext.getCmp("basicInfo").setDisabled(true);
	 }
}