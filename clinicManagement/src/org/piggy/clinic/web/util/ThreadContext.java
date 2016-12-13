package org.piggy.clinic.web.util;

import java.util.HashMap;
import java.util.Locale;
import java.util.Map;

import org.piggy.clinic.bo.BoOperator;
/**
 * 通过此类来管理当前线程的变量，例如登录用户的信息等。
 * 这些信息可能会在业务逻辑中用到。
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
