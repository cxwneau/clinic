Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux/');
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
								columnWidth:.99,
								xtype:'textfield',
								emptyText: "输入角色名称查询角色信息",
								hideLabel: 'true',
								labelAlign : 'right'
							}]
						},{
							width:50,
							xtype:'button',
							text: '查询',
							handler: doSearch
						}
				]
		});
		
		
		//数据集
		var roleStore = Ext.create('Ext.data.Store', {
	        pageSize: 15,//每页显示记录数
	        proxy:new Ext.data.proxy.Ajax({
						    url: g_baseUrlDomain + "?service=QueryRole",
						    reader: {
				            	type: 'xml',
				                totalProperty: 'totalCount',
				                record: 'DR'
				            }
						}),
	        fields:['ROLE_ID', 'ROLE_NAME', 'COMMENT']
	    });

		//创建一个表格，并为它指定数据集
		var roleGrid = Ext.create('Ext.grid.Panel', {
			id:'roleGrid',
		    store: roleStore,
		    columns: [
		        { text: '',  dataIndex: 'ROLE_ID', hidden: true},
		        { text: roleName, dataIndex: 'ROLE_NAME', flex: 1 },
		        { text: comment, dataIndex: 'COMMENT', flex: 1 }
		    ],
		    //工具栏
		    dockedItems: [{
	            xtype: 'toolbar',
	            dock: 'top',
	            items: [{
	            	id: 'addBtn',
	                text: addLabel,
	                icon: addIcon,
	                handler: addBtnClick
	            }, '-', {
	                id: 'modifyBtn',
	                text: modifyLabel,
	                icon: modifyIcon,
	                handler: modifyBtnClick
	            }, '-', {
	                id: 'deleteBtn',
	                text: deleteLabel,
	                icon: deleteIcon,
	                handler: deleteBtnClick
	            }, '->',{
	                id: 'configBtn',
	                text: "配置角色权限",
	                icon: configIcon,
	                handler: configBtnClick
	            }]
	        },
	        //分页控件
        	{
		    	xtype: 'pagingtoolbar',
		    	id: 'paging',
	            store: roleStore,
	            displayInfo: true,
	            displayMsg: '显示第<font color="#157FCC"><strong>{0}</strong></font>条到<font color="#157FCC"><strong>{1}</strong></font>条记录共<font color="#157FCC"><strong>{2}</strong></font>条',
	            emptyMsg: "没有数据",
	            dock: 'bottom'
		    }],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 500
		});
		
		//隐藏那个刷新按钮
		var length = roleGrid.dockedItems.keys.length;  
		var refreshStr= "";  
		for (var i = 0; i < length; i++) {  
		    if (roleGrid.dockedItems.keys[i].indexOf("paging") !== -1) {  
		         refreshStr= roleGrid.dockedItems.keys[i];  
		    }  
		}  
		roleGrid.dockedItems.get(refreshStr).child('#refresh').hide(true); 
		//绑定查询参数
		roleStore.on("beforeload",function(){
			var searchParams = {};
			if(Ext.String.trim(Ext.getCmp("searchName").getValue())){
				searchParams.ROLE_NAME=Ext.String.trim(Ext.getCmp("searchName").getValue());
			}
			this.proxy.extraParams = searchParams;
		});
		
		roleGrid.addListener('selectionchange',selectionchange);
		roleGrid.addListener('itemdblclick',itemdblclick);
		
		//展示角色信息的表单
		var roleForm = new Ext.form.Panel({
					id:"roleFieldset",
					border:0,
					flex:1,
					items : [
											{
											id:'basicInfo',
											width:'100%',
											layout : 'anchor',
											xtype : 'fieldset',
											flex:1,
											style : 'margin-left:5px;margin-right:5px;',
											defaultType : 'textfield',
											title : '角色信息',
											items : [{
														id:"gridRoleId",
														fieldLabel : 'ROLE_ID',
														name : 'ROLE_ID',
														hidden : true
													},{
														
														fieldLabel : roleName,
														name : 'ROLE_NAME',
														labelAlign : 'right',
														anchor: '100%',
														labelWidth:58
													}, {
														
														fieldLabel : comment,
														name : 'COMMENT',
														labelAlign : 'right',
														xtype:'textarea',
														height:110,
														anchor: '100%',
														labelWidth:58
													}]
										}
							]
					
				}); 
	      
		//左边布局容器
		var leftLayout = Ext.create('Ext.Panel', {
		    items: [searchForm,roleGrid,roleForm]
		});
		
		//弹出新增窗口
		var roleWin = Ext.create('Ext.Window', {
			id:'roleWin',
	        height: 230,
	        width: 470,
	        x:8,
	        y:85,
	        title: '新增角色',
	        closeAction:'hide',
	        modal:true,
	        items: [new Ext.form.Panel({
					id:"winFieldset",
					border:0,
					layout: 'anchor',
					defaultType: 'textfield',
					style : 'margin-top:5px;margin-left:5px;margin-right:5px;',
					items : [{
								id:"roldId",
								fieldLabel : 'ROLE_ID',
								name : 'ROLE_ID',
								hidden : true
							},{
								id:"roleName",
								fieldLabel : roleName,
								name : 'ROLE_NAME',
								labelAlign : 'right',
								labelWidth:70,
								anchor: '100%',
								allowBlank: false,
								blankText:"角色名称不可以为空!",
								afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
							}, {
								id:"comment",
								fieldLabel : comment,
								name : 'COMMENT',
								labelAlign : 'right',
								xtype:'textarea',
								height:110,
								anchor: '100%',
								labelWidth:70
							},{
								xtype:'panel',
								border:0,
								layout: {
								    type: 'hbox',
								    pack: 'center',
								    align: 'middle'
								},
								items:[	{
											id:'okBtn',
											xtype:'button',
											text : okLabel,
											margin:'10 10 0 0',
											handler : okBtnClick
										},{
											id:'cancelBtn',
											xtype:'button',
											text : cancelLabel,
											margin:'10 0 0 0',
											handler : cancelBtnClick
										}]
							}]
				})]
	    });
	    
	    //弹出权限配置窗口
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
	        x:200,
	        y:85,
	        title: '配置角色权限',
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
					    title: '角色权限',
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
					width : 480,
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
		//初始只激活"新增"按钮
		btnEnable([true,false,false,false]);
	});
})();
