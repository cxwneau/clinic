package org.piggy.clinic.web.util;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.piggy.clinic.bo.BoOperator;
/**
 * ͨ������������ǰ�̵߳ı����������¼�û�����Ϣ�ȡ�
 * ��Щ��Ϣ���ܻ���ҵ���߼����õ���
 * @author lenovo1
 *
 */
public class ThreadContext {

	private static ThreadLocal<Map<String, Object>> threadLocal = new ThreadLocal<Map<String, Object>>() {
		protected Map<String, Object> initialValue() {
			Map<String, Object> map = new HashMap<String, Object>();
			return map;
		}
	};

	public static void setUser(BoOperator user) {
		Map<String, Object> map = (Map<String, Object>) threadLocal.get();
		map.put("CURRENT_USER", user);
	}

	public static BoOperator getUser() {
		Map<String, Object> map = (Map<String, Object>) threadLocal.get();
		BoOperator user = (BoOperator) map.get("CURRENT_USER");
		return user;
	}
}
