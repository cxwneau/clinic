 /**************************不分页**********************************/
(function(){
	Ext.onReady(function(){
		//这一句是启用所有的悬浮提示
		Ext.QuickTips.init();
		//创建一个数据集，用来给控件传递数据
		var custStore = Ext.create('Ext.data.Store', {
		    storeId:'custStore',
		    fields:['CUST_ID', 'CUST_NAME', 'SEX', 'BIRTHDAY', 'CERTIFICATE_TYPE', 'CERTIFICATE', 'PHONENUMBER', 'CUST_ADDRESS', 'OTHER_CONTACTINFO', 'ICON'],
		    data:[]
		});
		
		//创建一个表格，并为它指定数据集
		var custGrid = Ext.create('Ext.grid.Panel', {
			id:'custGrid',
		    store: custStore,
		    columns: [
		        { text: 'CUST_ID',  dataIndex: 'CUST_ID', hidden: true},
		        { text: custName, dataIndex: 'CUST_NAME', flex: 1 },
		        { text: sex, dataIndex: 'SEX', flex: 1 },
		        { text: birthday, dataIndex: 'BIRTHDAY', flex: 1 },
		        { text: certificateType, dataIndex: 'CERTIFICATE_TYPE', hidden: true},
		        { text: certificate, dataIndex: 'CERTIFICATE', hidden: true},
		        { text: phoneNumber, dataIndex: 'PHONENUMBER', flex: 1 },
		        { text: custAddress, dataIndex: 'CUST_ADDRESS', flex: 1 },
		        { text: otherContact, dataIndex: 'OTHER_CONTACTINFO', flex: 1 },
		        { text: icon, dataIndex: 'ICON', hidden: true}
		    ],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 310,
		    width: '100%'
		});
		
		
		var btn = Ext.create('Ext.Button', {
		    text: 'Get Data',
		    handler: function() {
		    	var store = Ext.getCmp("custGrid").store;
				store.removeAll();
    			//重新设置数据
				var param = {};
				var ret = [];
				try {
					ret = callRemoteQueryFunction("QueryCustomer", param);
				} catch (e) {
					Ext.MessageBox.alert('Alert', e.Desc);
				}
		        store.add(ret);
			    Ext.getCmp("custGrid").getView().refresh();
		    }
		});
		
		//布局容器
		var topLayout = Ext.create('Ext.Panel', {
			header:false,
			style:'border-style:none',
			width:'100%',
			border:0,
			padding:0,
		    layout: {
		        type: 'vbox',
		        align: 'left'
		    },
		    items: [custGrid,btn],
		    renderTo: Ext.getBody()
		});
		
	});
})();
