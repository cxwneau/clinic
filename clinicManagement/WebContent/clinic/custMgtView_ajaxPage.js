 /**************************这是真分页，即每次只查询10条记录**********************************/
(function(){
	Ext.onReady(function(){
		//这一句是启用所有的悬浮提示
		Ext.QuickTips.init();
		
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
		    bbar: Ext.create('Ext.PagingToolbar', {
		    	id: 'custPaging',
	            store: custStore,
	            displayInfo: true,
	            displayMsg: '显示第<font color="#157FCC"><strong>{0}</strong></font>条到<font color="#157FCC"><strong>{1}</strong></font>条记录共<font color="#157FCC"><strong>{2}</strong></font>条',
	            emptyMsg: "没有数据",
	            items:['-']
	        }),
	        viewConfig:{  
                enableTextSelection:true  
            },
		    columnLines:true,
		    height: 325,
		    width: '100%'
		});
		
		
		var btn = Ext.create('Ext.Button', {
		    text: 'Get Data',
		    handler: function() {
		    	custStore.load({ params: { start: 0, limit: 10} });
		    }
		});
		
		//展示客户信息的表单
		var form = new Ext.form.FormPanel({
					labelWidth : 50,
					buttonAlign : 'center',
					boder : 0,
					width : '100%',
					items : [{
								layout : 'column',
								items : [{
											columnWidth : .11,
											layout : 'form',
											xtype : 'fieldset',
											height:284,
											defaultType : 'textfield',
											title : '客户照片 ',
											items : [	{
												    		xtype:'image',
												    		border:0,
												    		src:g_GlobalInfo.webRoot+'images/custPhoto/chui2.png'
											    		}, {
															buttonText: '选择照片',
															xtype: 'filefield',
															name : 'ICON',
															hideLabel: true,
															labelAlign : 'right'
														},{
													        xtype:'button',
													        align: 'right',
													        text: '上传',
													        handler: function(){
													        }
													    }
											    	]
										}, {
											columnWidth : .89,
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
														anchor: '30%'
													}, {
														fieldLabel : sex,
														name : 'SEX',
														labelAlign : 'right',
														anchor: '30%'
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
														anchor: '30%'
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
								text : '按钮',
								handler : function() {
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
		        align: 'left'
		    },
		    items: [custGrid,form,btn],
		    renderTo: Ext.getBody()
		});
		
	});
})();
