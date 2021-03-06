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
							text: searchLabel,
							handler: doSearch
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
		    height: 325
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
		
		custGrid.addListener('selectionchange',selectionchange);
		custGrid.addListener('itemdblclick',itemdblclick);
		
		//展示客户信息的表单
		var custForm = new Ext.form.Panel({
					id:"custFieldset",
					buttonAlign : 'center',
					border:0,
					items : [{
								layout : 'hbox',
								frame:false,
								border : 0,
								items : [
									{
											id:'photo',
											width:180,
											layout : 'form',
											xtype : 'fieldset',
											disabled:true,
											height:284,
											align : 'right',
											title : '客户照片 ',
											items : [	{
															id:"custIcon",
															fieldLabel : 'ICON',
															name : 'ICON',
															hidden : true
														},{
												    		xtype:'image',
												    		id:'custPhoto',
												    		height:206,
												    		width:159,
												    		border:0,
												    		src:g_GlobalInfo.webRoot+'images/portal/defaultPhoto.png'
											    		}, {
															xtype:'button',
															text: '更换照片',
															width:'100%',
															handler: function(){
																roleWin.show();
															}
														}
											    	]
										}, 
											{
											id:'basicInfo',
											width:'100%',
											layout : 'anchor',
											xtype : 'fieldset',
											disabled:true,
											autoHeight : true,
											height:284,
											style : 'margin-left:10px',
											defaultType : 'textfield',
											title : '客户信息',
											items : [{
														id:"custId",
														fieldLabel : 'CUST_ID',
														name : 'CUST_ID',
														hidden : true
													}, {
														id:"custName",
														fieldLabel : custName,
														name : 'CUST_NAME',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"客户姓名不可以为空!",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"sex",
														fieldLabel : sex,
														xtype: 'combobox',
														name : 'SEX',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"客户性别不可以为空!",
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
														id:"birthSelector",
														fieldLabel : birthday,
														name : 'BIRTHDAY',
														labelAlign : 'right',
														xtype: 'datefield',
														anchor: '30%',
														emptyText: "--请选择--",
   														format: "Y年m月d日"//日期的格式
													}, {
														id:"phoneNumber",
														fieldLabel : phoneNumber,
														name : 'PHONENUMBER',
														labelAlign : 'right',
														anchor: '30%',
														allowBlank: false,
														blankText:"客户手机号不可以为空!",
														validateOnBlur : true,
														validateOnChange : false,
														regex: /^[1]\d{10}$/,
														regexText:"您输入的不是正确的手机号",
														afterLabelTextTpl:'<span style="color:red;font-weight:bold" data-qtip="必填项">*</span>'
													}, {
														id:"custAddress",
														fieldLabel : custAddress,
														name : 'CUST_ADDRESS',
														labelAlign : 'right',
														xtype:'textarea',
														anchor: '100%'
													}, {
														id:"otherContact",
														fieldLabel : otherContact,
														name : 'OTHER_CONTACTINFO',
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
	      
		var uploadPanel = Ext.create('Ext.ux.uploadPanel.UploadPanel',{  
		    //title : '上传文件',  
			width : 700,
		    addFileBtnText : '选择文件...',  
		    uploadBtnText : '上传',  
		    removeBtnText : '移除所有',  
		    cancelBtnText : '取消上传', 
		    tipLabelText : '最多1张照片，最大1M，jpg、png、gif格式',
		    file_size_limit : 1,//MB 
			file_types : "*.jpg;*.png;*.gif",
			file_upload_limit : 0,
			file_queue_limit : 1,
		    upload_url : g_GlobalInfo.webRoot +'upload.do?SERVICE_NAME=CUST_PHOTO',
			successCallBack : function (file, serverData, responseReceived){
									if(Ext.JSON.decode(serverData).success){
										Ext.getCmp("custPhoto").src = g_GlobalInfo.webRoot+Ext.JSON.decode(serverData).returnPath;
										Ext.getCmp("custPhoto").getEl().dom.src = g_GlobalInfo.webRoot+Ext.JSON.decode(serverData).returnPath;
										custForm.doLayout();
										this.onRemove();
										roleWin.hide();
										Ext.getCmp("custIcon").value = Ext.JSON.decode(serverData).returnPath;
									}
								}
		});  
		//弹出新增窗口
		var roleWin = Ext.create('Ext.Window', {
			title:"更换照片",
			id:'roleWin',
	        width : 700,
			height : 300,
	        closeAction:'hide',
	        modal:true,
	        items: [new Ext.form.Panel({
					id:"winFieldset",
					border:0,
					layout: 'anchor',
					defaultType: 'textfield',
					items : [uploadPanel]
				})]
	    });
	    
		//布局容器
		var topLayout = Ext.create('Ext.Panel', {
		    items: [searchForm,custGrid,custForm],
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
