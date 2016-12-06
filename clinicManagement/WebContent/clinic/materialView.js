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
							columnWidth:.5,
							items:[{
								id:"searchName",
								columnWidth:.49,
								xtype:'textfield',
								fieldLabel : materialName,
								name : 'MATERIAL_NO',
								labelAlign : 'right'
							},{
								id:"searchModel",
								columnWidth:.49,
								xtype:'textfield',
								fieldLabel : model,
								name : 'MODEL',
								labelAlign : 'right'
							}]
						},{
							xtype:'button',
							text: '查询',
							handler: doSearch
						}
				]
		});
		
		
		//数据集
		var materialStore = Ext.create('Ext.data.Store', {
	        pageSize: 15,//每页显示记录数
	        proxy:new Ext.data.proxy.Ajax({
						    url: g_baseUrlDomain + "?service=QueryMaterial",
						    reader: {
				            	type: 'xml',//数据格式是xml
				                totalProperty: 'totalCount',//总数量的字段是这个
				                record: 'DR'//实际记录的节点
				            }
						}),
	        fields:['MATERIAL_ID', 'MATERIAL_NO', 'MODEL', 'MATERIAL_PRICE', 'NUMBER']
	    });

		//创建一个表格，并为它指定数据集
		var materialGrid = Ext.create('Ext.grid.Panel', {
			id:'materialGrid',
		    store: materialStore,
		    columns: [
		        { text: '',  dataIndex: 'MATERIAL_ID', hidden: true},
		        { text: materialName, dataIndex: 'MATERIAL_NO', flex: 1 },
		        { text: model, dataIndex: 'MODEL', flex: 1 },
		        { text: price, dataIndex: 'MATERIAL_PRICE', flex: 1,renderer: Ext.util.Format.numberRenderer('0.00') },
		        { text: useTime, dataIndex: 'NUMBER', flex: 1 }
		    ],
		    //分页控件
		    dockedItems: [{
		    	xtype: 'pagingtoolbar',
		    	id: 'paging',
	            store: materialStore,
	            displayInfo: true,
	            displayMsg: '显示第<font color="#157FCC"><strong>{0}</strong></font>条到<font color="#157FCC"><strong>{1}</strong></font>条记录共<font color="#157FCC"><strong>{2}</strong></font>条',
	            emptyMsg: "没有数据",
	            dock: 'bottom'
		    }],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 450
		});
		
		//隐藏那个刷新按钮
		var length = materialGrid.dockedItems.keys.length;  
		var refreshStr= "";  
		for (var i = 0; i < length; i++) {  
		    if (materialGrid.dockedItems.keys[i].indexOf("paging") !== -1) {  
		         refreshStr= materialGrid.dockedItems.keys[i];  
		    }  
		}  
		materialGrid.dockedItems.get(refreshStr).child('#refresh').hide(true); 
		//绑定查询参数
		materialStore.on("beforeload",function(){
			var searchParams = {};
			if(Ext.String.trim(Ext.getCmp("searchName").getValue())){
				searchParams.MATERIAL_NO=Ext.String.trim(Ext.getCmp("searchName").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchModel").getValue())){
				searchParams.MODEL=Ext.String.trim(Ext.getCmp("searchModel").getValue());
			}
			this.proxy.extraParams = searchParams;
		});
		
		materialGrid.addListener('selectionchange',selectionchange);
		materialGrid.addListener('itemdblclick',itemdblclick);
		
		//展示客户信息的表单
		var materialForm = new Ext.form.Panel({
					id:"materialFieldset",
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
											height:150,
											style : 'margin-left:10px',
											defaultType : 'textfield',
											title : '物品信息',
											items : [{
														id:"materialId",
														fieldLabel : 'MATERIAL_ID',
														name : 'MATERIAL_ID',
														hidden : true
													}, {
														id:"materialName",
														fieldLabel : materialName,
														name : 'MATERIAL_NO',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"物品名称不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"model",
														fieldLabel : model,
														name : 'MODEL',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"型号不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"price",
														xtype:"numberfield",
														minValue:0,
														allowDecimals: true,
                										decimalPrecision: 2,
                										negativeText : "不能是负值",
														fieldLabel : price,
														name : 'MATERIAL_PRICE',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"价格不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"useTime",
														xtype:"numberfield",
														value:1,
														minValue:1,
														fieldLabel : useTime,
														name : 'NUMBER',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"可用次数不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}]
										}]
							}],
					buttons : [{
								id:'addBtn',
								text : '新增',
								handler : addBtnClick
							},{
								id:'modifyBtn',
								text : '修改',
								handler : modifyBtnClick
							},{
								id:'deleteBtn',
								text : '删除',
								handler : deleteBtnClick
							},{
								id:'okBtn',
								text : '确定',
								handler : okBtnClick
							},{
								id:'cancelBtn',
								text : '取消',
								handler : cancelBtnClick
							}]
				}); 
	      
		//布局容器
		var topLayout = Ext.create('Ext.Panel', {
		    items: [searchForm,materialGrid,materialForm],
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
