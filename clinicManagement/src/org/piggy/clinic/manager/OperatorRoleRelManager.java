package org.piggy.clinic.manager;

import java.util.List;

import org.piggy.clinic.bo.BoOperatorRoleRel;
import org.piggy.clinic.dao.OperatorRoleRelDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("OperatorRoleRelManager")
public class OperatorRoleRelManager {
	
	public void addOperatorRoleRelBatch(List<BoOperatorRoleRel> list) throws BaseAppException {
		OperatorRoleRelDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorRoleRelDao.class);
		dao.addOperatorRoleRelBatch(list);
	}
	
	
	public void deleteOperatorRoleRelByRole(long opeartorId) throws BaseAppException {
		OperatorRoleRelDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorRoleRelDao.class);
		dao.deleteOperatorRoleRelByRole(opeartorId);
	}
	
}
