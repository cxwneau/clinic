package org.piggy.clinic.manager;

import java.util.Date;
import java.util.List;

import org.piggy.clinic.bo.BoOperator;
import org.piggy.clinic.dao.OperatorDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("OperatorManager")
public class OperatorManager {
	
	public void addOperator(BoOperator operator) throws BaseAppException {
		OperatorDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorDao.class);
		operator.setStatusTime(new Date());
		dao.addOperator(operator);
	}
	
	public void updateOperator(BoOperator operator) throws BaseAppException {
		OperatorDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorDao.class);
		operator.setStatusTime(new Date());
		dao.updateOperator(operator);
	}
	
	public void deleteOperator(BoOperator operator) throws BaseAppException {
		OperatorDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorDao.class);
		dao.deleteOperator(operator);
	}
	
	public BoOperator queryOperator (BoOperator operator) throws BaseAppException {
		OperatorDao dao = SpringUtils.getSpringBeanFactory().getBean(OperatorDao.class);
		List<BO> operatorList = dao.queryOperator(operator);
		if (operatorList.size() > 0) {
			return (BoOperator)operatorList.get(0);
		}else{
			return null;
		}
	}
}
