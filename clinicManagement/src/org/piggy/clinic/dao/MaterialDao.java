package org.piggy.clinic.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.piggy.clinic.bo.BoCustomer;
import org.piggy.clinic.bo.BoMaterial;
import org.piggy.core.db.SqlGenerator;
import org.piggy.core.exceptions.BaseAppException;
import org.piggy.core.model.BO;
import org.piggy.core.utils.DBAccessUtils;
import org.springframework.stereotype.Repository;


@Repository("MaterialDao")
public class MaterialDao {
	
	public void add(BoMaterial material) throws BaseAppException {
		String sql = SqlGenerator.generateInsertSql(material);
		Map<String,Object> paraMap = material.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void update(BoMaterial material) throws BaseAppException {
		String sql = SqlGenerator.generateUpdateSql(material, BoMaterial.s_c_materialId);
		Map<String,Object> paraMap = material.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	public void delete(BoMaterial material) throws BaseAppException {
		String sql = SqlGenerator.generateDeleteSql(material, BoMaterial.s_c_materialId);
		Map<String,Object> paraMap = material.valueMap;
		DBAccessUtils.getDbOperator().executeUpdate(sql, paraMap);
	}
	
	public List<BO> query(BoMaterial material) throws BaseAppException {
		String sql = "SELECT * FROM TRM_MATERIAL WHERE MATERIAL_ID=:MATERIAL_ID";
		Map<String,Object> paraMap = new HashMap<>();
		paraMap.put("MATERIAL_ID", material.getMaterialId());
		List<BO> resultList = DBAccessUtils.getDbOperator().queryBOList(sql, paraMap, BoMaterial.class.getName());
		return resultList;
	}
}
