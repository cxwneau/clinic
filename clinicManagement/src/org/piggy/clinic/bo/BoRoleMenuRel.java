package org.piggy.clinic.bo;


import org.piggy.core.model.BO;

public class BoRoleMenuRel extends BO {
	public static String s_c_roleId = "ROLE_ID";
	public static String s_c_menuId = "MENU_ID";
	
	
	
	private String s_c_tableName = "role_menu_rel";
	
	private long roleId;
	private long menuId;
	
	public long getRoleId() {
		return (long)valueMap.get(s_c_roleId);
	}
	public void setRoleId(long roleId) {
		valueMap.put(s_c_roleId, roleId);
	}

	
	public long getMenuId() {
		return (long)valueMap.get(s_c_menuId);
	}
	public void setMenuId(long menuId) {
		valueMap.put(s_c_menuId, menuId);
	}
	@Override
	public String tableName() {
		return s_c_tableName;
	}
}
