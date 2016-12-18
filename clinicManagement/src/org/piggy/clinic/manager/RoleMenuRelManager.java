package org.piggy.clinic.manager;

import java.util.List;

import org.piggy.clinic.bo.BoRoleMenuRel;
import org.piggy.clinic.dao.RoleMenuRelDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("RoleMenuRelManager")
public class RoleMenuRelManager {
	
	public void addRoleMenuRelBatch(List<BoRoleMenuRel> list) throws BaseAppException {
		RoleMenuRelDao dao = SpringUtils.getBean(RoleMenuRelDao.class);
		dao.addRoleMenuRelBatch(list);
	}
	
	
	public void deleteRoleMenuRelByRole(long roleId) throws BaseAppException {
		RoleMenuRelDao dao = SpringUtils.getBean(RoleMenuRelDao.class);
		dao.deleteRoleMenuRelByRole(roleId);
	}
	
}
