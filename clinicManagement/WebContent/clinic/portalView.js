Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath('Ext.ux', '../ux/');
(function(){
	Ext.onReady(function(){
		
		//初始化logo图片
    	var logoImg = {};
    	logoImg.border=0;
    	logoImg.xtype='image';
    	logoImg.src=g_GlobalInfo.webRoot+'images/portal/logo.png'
		//将logo放置于一个panel里
		var logo = Ext.create('Ext.Panel', {
			width:400,
			height:110,
			border:0,
			bodyStyle: 'background-image:url('+g_GlobalInfo.webRoot+'images/portal/banner_bg.png);background-repeat: repeat-x;height:100%',
		    items: [logoImg]
		});
		
		//查找操作员可以访问的模块
		var param = {};
		param.OPERATOR_ID = op_id;
		var retModules = [];
		try {
			retModules = callRemoteQueryFunction("QueryOpModules", param);
		} catch (e) {
			Ext.MessageBox.alert('Alert', e.Desc);
		}
		//初始化模块图片
    	var moduleImgs = [];
    	for(var i=0;i<retModules.length;i++){
    		(function(){
    			var moduleImg = {};
	    		moduleImg.border=0;
	    		moduleImg.data = retModules[i];
	    		moduleImg.xtype='image';
	    		moduleImg.src=g_GlobalInfo.webRoot+retModules[i].ICON;
	    		moduleImg.cls='moduleimage';
	    		var currentModule = retModules[i];
	    		moduleImg.listeners = {
			        el: {
			            click: function() {
			                createModuleMenu(currentModule);
			            }
			        }
			    };
	    		moduleImgs.push(moduleImg);
	    	}());
    	}
		//将模块图片放置于一个panel里
		var modulePanel = Ext.create('Ext.Panel', {
			height:110,
			width:'100%',
			border:0,
			bodyStyle: 'background-image:url('+g_GlobalInfo.webRoot+'images/portal/banner_bg.png);background-repeat: repeat-x;height:100%',
		    layout: {
		        type: 'table',
		        align: 'left',
		        tdAttrs: { style: 'padding: 5px 5px 5px 5px ;' }
		    },
		    items: moduleImgs
		});
		//顶端布局
		var topLayout = Ext.create('Ext.Panel', {
		    layout: {
		        type: 'hbox',
		        align: 'left'
		    },
		    items: [logo,modulePanel]
		});
		
		//构造左端导航面板
		var menuPanel = Ext.create('Ext.Panel', {
			title:"菜单导航",
			id:"menuPanel",
			border:0,
			bodyStyle: 'background: #ADD2ED;padding: 0px 0px 0px 0px' ,
			width:250,
			height:700,
			items: [],
			html:""
		});
		
		//主工作区的tab页
		var tabPanel = Ext.create('Ext.tab.Panel', {
			id:"mainTabs",
		    width: '100%',
		    border:0,
		    enableTabScroll: true,
		    items: [{
		        title: '欢迎使用！',
		        icon:g_GlobalInfo.webRoot+'images/portal/tips.png',
		        closable: true,
		        html:'<iframe scrolling="auto" frameborder="0" width="100%" height="100%" src="'+g_GlobalInfo.webRoot+'clinic/welcome.jsp'+'"> </iframe>'
		    }],
		    plugins: [Ext.create('Ext.ux.TabCloseMenu', {}),
					    Ext.create('Ext.ux.TabScrollerMenu', {
					    	maxText  : 15,
                			pageSize : 25
					    })
		    ]
		});
		
		//整体布局并且开始展示
		Ext.create('Ext.Viewport', {
			layout : 'border',
			border:0,
			items : [
				{
					region : 'north',
					split : true,
					height : 110,
					layout : 'fit',
					margin : '0 0 0 0',
					bodyStyle: 'border-width:0 0 0 0',
					items :[topLayout]
				},
				{
					region : 'west',
					split : true,
					layout : 'fit',
					margin : '0 0 0 5',
					padding: '0 0 0 0',
					bodyStyle: 'border-width:0 0 0 0',
					width : 250,
					items :[menuPanel]
				},
				{
					region : 'center',
					split : true,
					layout : 'fit',
					margin : '0 2 0 2',
					bodyStyle: 'border-width:1 1 1 1',
					items :[tabPanel]
				},
				{
					region : 'south',
					split : true,
					height : 50,
					layout : 'fit',
					margin : '0 2 2 2',
					bodyStyle: 'border-width:1 1 1 1',
					html : '<center><p style="padding:10px;color:#556677">piggy版权所有2016</p></center>'
				}
			],
			renderTo: Ext.getBody()
		});
		
		$(".moduleimage").mouseover(function(){
			$(this).css({opacity:0.7});
		});
		$(".moduleimage").mouseout(function(){
			$(this).css({opacity:1});
		});
		//如果有模块，则默认选中第一个
		if(retModules.length>0){
			createModuleMenu(retModules[0]);
		}
	});
})();
