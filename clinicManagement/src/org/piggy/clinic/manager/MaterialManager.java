package org.piggy.clinic.manager;

import java.util.Date;
import java.util.List;

import org.piggy.clinic.bo.BoMaterial;
import org.piggy.clinic.dao.MaterialDao;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.SpringUtils;
import org.springframework.stereotype.Service;

@Service("MaterialManager")
public class MaterialManager {
	
	public void add(BoMaterial material) throws BaseAppException {
		MaterialDao dao = SpringUtils.getSpringBeanFactory().getBean(MaterialDao.class);
		material.setOperTime(new Date());
		dao.add(material);
	}
	
	public void update(BoMaterial material) throws BaseAppException {
		MaterialDao dao = SpringUtils.getSpringBeanFactory().getBean(MaterialDao.class);
		material.setOperTime(new Date());
		dao.update(material);
	}
	
	public void delete(BoMaterial material) throws BaseAppException {
		MaterialDao dao = SpringUtils.getSpringBeanFactory().getBean(MaterialDao.class);
		dao.delete(material);
	}
	
	public BoMaterial query(BoMaterial material) throws BaseAppException {
		MaterialDao dao = SpringUtils.getSpringBeanFactory().getBean(MaterialDao.class);
		List<BO> materialList = dao.query(material);
		if (materialList.size() > 0) {
			return (BoMaterial)materialList.get(0);
		}else{
			return null;
		}
	}
}
