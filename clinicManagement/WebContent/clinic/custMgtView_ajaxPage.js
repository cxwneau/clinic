 /**************************这是真分页，即每次只查询10条记录**********************************/
(function(){
	Ext.onReady(function(){
		//这一句是启用所有的悬浮提示
		Ext.QuickTips.init();
		
		//搜索框
		var searchForm = new Ext.form.FormPanel({
			height:45,
			width: '100%',
			layout: 'column',
			bodyStyle: 'padding:10px 5px 0',
			items : [
						{
							border:0,
							layout: 'column',
							columnWidth:.9,
							items:[{
								id:"searchName",
								columnWidth:.33,
								xtype:'textfield',
								fieldLabel : custName,
								name : 'CUST_NAME',
								labelAlign : 'right'
							},{
								id:"searchPhone",
								columnWidth:.33,
								xtype:'textfield',
								fieldLabel : phoneNumber,
								name : 'PHONENUMBER',
								labelAlign : 'right'
							},{
								id:"searchContact",
								columnWidth:.33,
								xtype:'textfield',
								fieldLabel : otherContact,
								name : 'OTHER_CONTACTINFO',
								labelAlign : 'right'
							}]
						},{
							xtype:'button',
							text: '查询',
							handler: function(){
								custStore.currentPage=1;
		    					custStore.load({ params: { start: 0, limit: 10} });
							}
						}
					
				]
		});
		
		
		//数据集
		var custStore = Ext.create('Ext.data.Store', {
	        pageSize: 10,//每页显示记录数
	        proxy:new Ext.data.proxy.Ajax({
						    url: g_baseUrlDomain + "?service=QueryCustomer",
						    reader: {
				            	type: 'xml',//数据格式是xml
				                totalProperty: 'totalCount',//总数量的字段是这个
				                record: 'DR'//实际记录的节点
				            }
						}),
	        fields:['CUST_ID', 'CUST_NAME', 'SEX', 'BIRTHDAY', 'CERTIFICATE_TYPE', 'CERTIFICATE', 'PHONENUMBER', 'CUST_ADDRESS', 'OTHER_CONTACTINFO', 'ICON']
	    });

		//创建一个表格，并为它指定数据集
		var custGrid = Ext.create('Ext.grid.Panel', {
			id:'custGrid',
		    store: custStore,
		    columns: [
		        { text: 'CUST_ID',  dataIndex: 'CUST_ID', hidden: true},
		        { text: custName, dataIndex: 'CUST_NAME', flex: 1 },
		        { text: sex, dataIndex: 'SEX', flex: 1,
			        renderer:function(value){
				        if (value == 1) {
				            return '男';
				        }else if (value == 2) {
				            return '女';
				        }else {return '';}
				    } 
			    },
		        { text: birthday, dataIndex: 'BIRTHDAY', flex: 1, renderer: Ext.util.Format.dateRenderer('Y年m月d日')},
		        { text: certificateType, dataIndex: 'CERTIFICATE_TYPE', hidden: true},
		        { text: certificate, dataIndex: 'CERTIFICATE', hidden: true},
		        { text: phoneNumber, dataIndex: 'PHONENUMBER', flex: 1 },
		        { text: custAddress, dataIndex: 'CUST_ADDRESS', flex: 1 },
		        { text: otherContact, dataIndex: 'OTHER_CONTACTINFO', flex: 1 },
		        { text: icon, dataIndex: 'ICON', hidden: true}
		    ],
		    //分页控件
		    dockedItems: [{
		    	xtype: 'pagingtoolbar',
		    	id: 'custPaging',
	            store: custStore,
	            displayInfo: true,
	            displayMsg: '显示第<font color="#157FCC"><strong>{0}</strong></font>条到<font color="#157FCC"><strong>{1}</strong></font>条记录共<font color="#157FCC"><strong>{2}</strong></font>条',
	            emptyMsg: "没有数据",
	            dock: 'bottom'
		    }],
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 325,
		    width: '100%'
		});
		
		//隐藏那个刷新按钮
		var length = custGrid.dockedItems.keys.length;  
		var refreshStr= "";  
		for (var i = 0; i < length; i++) {  
		    if (custGrid.dockedItems.keys[i].indexOf("custPaging") !== -1) {  
		         refreshStr= custGrid.dockedItems.keys[i];  
		    }  
		}  
		custGrid.dockedItems.get(refreshStr).child('#refresh').hide(true); 
		//绑定查询参数
		custStore.on("beforeload",function(){
			var searchParams = {};
			if(Ext.String.trim(Ext.getCmp("searchName").getValue())){
				searchParams.CUST_NAME=Ext.String.trim(Ext.getCmp("searchName").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchPhone").getValue())){
				searchParams.PHONENUMBER=Ext.String.trim(Ext.getCmp("searchPhone").getValue());
			}
			if(Ext.String.trim(Ext.getCmp("searchContact").getValue())){
				searchParams.OTHER_CONTACTINFO=Ext.String.trim(Ext.getCmp("searchContact").getValue());
			}
			this.proxy.extraParams = searchParams;
		});
		
		custGrid.addListener('itemclick',itemclick);
		custGrid.addListener('itemdbclick',itemdbclick);
		
		//展示客户信息的表单
		var custForm = new Ext.form.FormPanel({
					buttonAlign : 'center',
					boder : 0,
					width : '100%',
					items : [{
								layout : 'hbox',
								boder : 0,
								items : [{
											width:180,
											layout : 'form',
											xtype : 'fieldset',
											height:284,
											align : 'right',
											title : '客户照片 ',
											items : [	{
												    		xtype:'image',
												    		border:0,
												    		src:g_GlobalInfo.webRoot+'images/custPhoto/chui2.png'
											    		}, {
															buttonText: '选择照片',
															xtype: 'filefield',
															name : 'ICON',
															hideLabel: true
														},{
															xtype:'button',
															text: '上传',
															handler: function(){
															}
														}
											    	]
										}, {
											width:'100%',
											layout : 'anchor',
											xtype : 'fieldset',
											autoHeight : true,
											height:284,
											style : 'margin-left:10px',
											defaultType : 'textfield',
											title : '客户信息',
											items : [{
														fieldLabel : 'CUST_ID',
														name : 'CUST_ID',
														hidden : true
													}, {
														fieldLabel : custName,
														name : 'CUST_NAME',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														fieldLabel : sex,
														xtype: 'combobox',
														name : 'SEX',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														store: {
													            fields: ['value', 'label'],
													            data : [
													                {"value":"1", "label":"男"},
													                {"value":"2", "label":"女"}
													            ]
													        },
													    queryMode: 'local',
													    displayField: 'label',
													    valueField: 'value',
													    afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														fieldLabel : birthday,
														name : 'BIRTHDAY',
														labelAlign : 'right',
														xtype: 'datefield',
														anchor: '30%'
													}, {
														fieldLabel : phoneNumber,
														name : 'PHONENUMBER',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														minLength: 11,
														maxLength: 11,
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														fieldLabel : custAddress,
														name : 'CUST_ADDRESS',
														labelAlign : 'right',
														xtype:'textarea',
														anchor: '100%'
													}, {
														fieldLabel : otherContact,
														name : 'OTHER_CONTACTINFO',
														labelAlign : 'right',
														xtype:'textarea',
														anchor: '100%'
													}]
										}]
							}],
					buttons : [{
								text : '新增',
								handler : function() {
									alert('新增');
								}
							},{
								text : '删除',
								handler : function() {
									alert('删除');
								}
							},{
								text : '修改',
								handler : function() {
									alert('修改');
								}
							},{
								text : '确定',
								handler : function() {
									alert('确定');
								}
							},{
								text : '取消',
								handler : function() {
									alert('取消');
								}
							}]
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
		        align: 'strech'
		    },
		    items: [searchForm,custGrid,custForm],
		    renderTo: Ext.getBody()
		});
		
	});
})();
