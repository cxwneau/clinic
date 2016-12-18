(function(){
	Ext.onReady(function(){
		//这一句是启用所有的悬浮提示
		Ext.QuickTips.init();
		Ext.form.Field.prototype.msgTarget="under";
		
		//搜索框
		var searchForm = new Ext.panel.Panel({
			height:45,
			layout: 'column',
			bodyStyle: 'padding:10px 5px 0',
			border:0,
			items : [
						{
							border:0,
							layout: 'column',
							columnWidth:1,
							items:[{
								id:"searchName",
								columnWidth:.5,
								xtype:'textfield',
								fieldLabel : operatorName,
								name : 'OPERATOR_NAME',
								labelAlign : 'right'
							},{
								id:"searchLoginName",
								columnWidth:.49,
								xtype:'textfield',
								fieldLabel : loginName,
								name : 'LOGIN_NAME',
								labelAlign : 'right'
							}]
						},{
							width:50,
							xtype:'button',
							text: searchLabel,
							handler: doSearch
						}
				]
		});
		
		//数据集
		var operatorStore = Ext.create('Ext.data.Store', {
	        pageSize: 10,
	        proxy:new Ext.data.proxy.Ajax({
						    url: g_baseUrlDomain + "?service=QueryOperator",
						    reader: {
				            	type: 'xml',
				                totalProperty: 'totalCount',
				                record: 'DR'
				            }
						}),
	        fields:['OPERATOR_ID', 'OPERATOR_NAME', 'PHONE', 'EMAIL', 'LOGIN_NAME', 'PASSWORD', 'COMMENT']
	    });

		//创建一个表格，并为它指定数据集
		var operatorGrid = Ext.create('Ext.grid.Panel', {
			id:'operatorGrid',
		    store: operatorStore,
		    columns: [
		        { text: '',  dataIndex: 'OPERATOR_ID', hidden: true},
		        { text: operatorName, dataIndex: 'OPERATOR_NAME', flex: 1 },
		        { text: phone, dataIndex: 'PHONE', flex: 1 },
		        { text: loginName, dataIndex: 'LOGIN_NAME', flex: 1 },
		        { text: comment, dataIndex: 'COMMENT', flex: 1 }
		    ],
		    //分页控件
		    dockedItems: [
		    	{
		            xtype: 'toolbar',
		            dock: 'top',
		            items: ['->',{
		                id: 'configBtn',
		                text: "配置操作员角色",
		                icon: configIcon,
		                handler: configBtnClick
		            }]
		        },
		    	{
			    	xtype: 'pagingtoolbar',
			    	id: 'paging',
		            store: operatorStore,
		            displayInfo: true,
		            displayMsg: '显示第<font color="#157FCC"><strong>{0}</strong></font>条到<font color="#157FCC"><strong>{1}</strong></font>条记录共<font color="#157FCC"><strong>{2}</strong></font>条',
		            emptyMsg: "没有数据",
		            dock: 'bottom'
		    	}],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 325
		});
		
		//隐藏那个刷新按钮
		var length = operatorGrid.dockedItems.keys.length;  
		var refreshStr= "";  
		for (var i = 0; i < length; i++) {  
		    if (operatorGrid.dockedItems.keys[i].indexOf("paging") !== -1) {  
		         refreshStr= operatorGrid.dockedItems.keys[i];  
		    }  
		}  
		operatorGrid.dockedItems.get(refreshStr).child('#refresh').hide(true); 
		//绑定查询参数
		operatorStore.on("beforeload",function(){
			var searchParams = {};
			if(Ext.String.trim(Ext.getCmp("searchName").getValue())){
				searchParams.OPERATOR_NAME=Ext.String.trim(Ext.getCmp("searchName").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchLoginName").getValue())){
				searchParams.LOGIN_NAME=Ext.String.trim(Ext.getCmp("searchLoginName").getValue());
			}
			this.proxy.extraParams = searchParams;
		});
		
		operatorGrid.addListener('selectionchange',selectionchange);
		
		//创建一个数据集，用来给控件传递数据
		var roleStore = Ext.create('Ext.data.Store', {
		    storeId:'roleStore',
		    fields:['ROLE_NAME', 'COMMENT'],
		    data:[]
		});
		
		//创建一个表格，并为它指定数据集
		var roleGrid = Ext.create('Ext.grid.Panel', {
			id:'roleGrid',
			title:"操作员角色",
		    store: roleStore,
		    columns: [
		        { text: roleName, dataIndex: 'ROLE_NAME', flex: 1 },
		        { text: comment, dataIndex: 'COMMENT', flex: 1 }
		    ],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 310,
		    width: '100%'
		});
		
		//左边布局容器
		var leftLayout = Ext.create('Ext.Panel', {
		    items: [searchForm,operatorGrid,roleGrid]
		});
		
	    //弹出角色配置窗口
		var configStore = Ext.create('Ext.data.TreeStore', {
					    root: {}
					});
		var configTree = Ext.create('Ext.tree.Panel', {
	    				id:"configTree",
					    store:configStore,
					    useArrows: true,
					    rootVisible: false,
					    height:621
					});
	    var configWin = Ext.create('Ext.Window', {
			id:'configWin',
	        height: 550,
	        width: 280,
	        x:320,
	        y:85,
	        title: '配置操作员角色',
	        closeAction:'hide',
	        buttonAlign : 'center',
	        modal:true,
	        items: [configTree],
	        buttons : [{
									text : okLabel,
									handler : okClick
								},{
									text : cancelLabel,
									handler : cancelClick
								}]
	    });
	    
		//右边权限树
	    var treeStore = Ext.create('Ext.data.TreeStore', {
					    root: {}
					});
		//右边权限树
	    var tree = Ext.create('Ext.tree.Panel', {
	    				id:"tree",
					    title: '操作员权限',
					    store:treeStore,
					    useArrows: true,
					    rootVisible: false
					});
		//整体布局并且开始展示
		Ext.create('Ext.container.Viewport', {
			layout : 'border',
			border:0,
			items : [
				{
					region : 'west',
					split : true,
					layout : 'fit',
					margin : '0 0 0 5',
					padding: '0 0 0 0',
					bodyStyle: 'border-width:0 0 0 0',
					width : 600,
					items :[leftLayout]
				},
				{
					region : 'center',
					split : true,
					layout : 'fit',
					margin : '0 2 0 2',
					bodyStyle: 'border-width:1 1 1 1',
					items :[tree]
				}
			],
			renderTo: Ext.getBody()
		});
		btnEnable([false]);
	});
})();
