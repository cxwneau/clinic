 /**************************这是真分页，即每次只查询10条记录**********************************/
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
							columnWidth:.9,
							items:[{
								id:"searchName",
								columnWidth:.24,
								xtype:'textfield',
								fieldLabel : operatorName,
								name : 'OPERATOR_NAME',
								labelAlign : 'right'
							},{
								id:"searchPhone",
								columnWidth:.25,
								xtype:'textfield',
								fieldLabel : phone,
								name : 'PHONE',
								labelAlign : 'right'
							},{
								id:"searchEmail",
								columnWidth:.25,
								xtype:'textfield',
								fieldLabel : email,
								name : 'EMAIL',
								labelAlign : 'right'
							},{
								id:"searchLoginName",
								columnWidth:.25,
								xtype:'textfield',
								fieldLabel : loginName,
								name : 'LOGIN_NAME',
								labelAlign : 'right'
							}]
						},{
							xtype:'button',
							text: searchLabel,
							handler: doSearch
						}
				]
		});
		
		
		//数据集
		var operatorStore = Ext.create('Ext.data.Store', {
	        pageSize: 10,//每页显示记录数
	        proxy:new Ext.data.proxy.Ajax({
						    url: g_baseUrlDomain + "?service=QueryOperator",
						    reader: {
				            	type: 'xml',//数据格式是xml
				                totalProperty: 'totalCount',//总数量的字段是这个
				                record: 'DR'//实际记录的节点
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
		        { text: email, dataIndex: 'EMAIL', flex: 1 },
		        { text: loginName, dataIndex: 'LOGIN_NAME', flex: 1 },
		        { text: password, dataIndex: 'PASSWORD', flex: 1 },
		        { text: comment, dataIndex: 'COMMENT', flex: 1 }
		    ],
		    //分页控件
		    dockedItems: [{
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
			if(Ext.String.trim(Ext.getCmp("searchPhone").getValue())){
				searchParams.PHONE=Ext.String.trim(Ext.getCmp("searchPhone").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchEmail").getValue())){
				searchParams.EMAIL=Ext.String.trim(Ext.getCmp("searchEmail").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchLoginName").getValue())){
				searchParams.LOGIN_NAME=Ext.String.trim(Ext.getCmp("searchLoginName").getValue());
			}
			this.proxy.extraParams = searchParams;
		});
		
		operatorGrid.addListener('selectionchange',selectionchange);
		operatorGrid.addListener('itemdblclick',itemdblclick);
		
		//展示客户信息的表单
		var operatorForm = new Ext.form.Panel({
					id:"operatorFieldset",
					buttonAlign : 'center',
					border:0,
					items : [{
								layout : 'hbox',
								frame:false,
								border : 0,
								items : [
											{
											id:'basicInfo',
											width:'100%',
											layout : 'anchor',
											xtype : 'fieldset',
											disabled:true,
											autoHeight : true,
											height:250,
											style : 'margin-left:10px',
											defaultType : 'textfield',
											title : '操作员信息',
											items : [{
														id:"operatorId",
														fieldLabel : 'OPERATOR_ID',
														name : 'OPERATOR_ID',
														hidden : true
													}, {
														id:"operatorName",
														fieldLabel : operatorName,
														name : 'OPERATOR_NAME',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"操作员不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"phone",
														fieldLabel : phone,
														name : 'PHONE',
														labelAlign : 'right',
														anchor: '30%',
														validateOnBlur : true,
														validateOnChange : false,
														regex: /^[1]\d{10}$/,
														regexText:"您输入的不是正确的手机号"
													}, {
														id:"email",
														fieldLabel : email,
														name : 'EMAIL',
														labelAlign : 'right',
														anchor: '30%',
														validateOnBlur : true,
														validateOnChange : false,
														vtype: 'email'
													}, {
														id:"loginName",
														fieldLabel : loginName,
														name : 'LOGIN_NAME',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"登录名不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"password",
														fieldLabel : password,
														name : 'PASSWORD',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"密码不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"comment",
														fieldLabel : comment,
														name : 'COMMENT',
														labelAlign : 'right',
														xtype:'textarea',
														anchor: '100%'
													}]
										}]
							}],
					buttons : [{
									id:'addBtn',
									text : addLabel,
									handler : addBtnClick
								},{
									id:'modifyBtn',
									text : modifyLabel,
									handler : modifyBtnClick
								},{
									id:'deleteBtn',
									text : deleteLabel,
									handler : deleteBtnClick
								},{
									id:'okBtn',
									text : okLabel,
									handler : okBtnClick
								},{
									id:'cancelBtn',
									text : cancelLabel,
									handler : cancelBtnClick
								}]
				}); 
	      
		//布局容器
		var topLayout = Ext.create('Ext.Panel', {
		    items: [searchForm,operatorGrid,operatorForm],
		    renderTo: Ext.getBody()
		});
		Ext.EventManager.addListener(window, "resize", function() {
			topLayout.setWidth(Ext.getBody().getWidth());
			topLayout.doLayout();
		});
		//初始只展示"新增"按钮
		btnVisible([true,false,false,false,false]);
	});
})();
