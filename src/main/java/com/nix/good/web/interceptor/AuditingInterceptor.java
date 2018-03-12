package com.nix.good.web.interceptor;

import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Properties;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;

@Intercepts({@Signature(type = Executor.class, method = "update", args = {MappedStatement.class, Object.class})})
public class AuditingInterceptor implements Interceptor {
	@Override
	public Object intercept(Invocation invocation) throws Throwable {
		return invocation.proceed();
	}
	
	@Override
	public Object plugin(Object target) {
		if (target instanceof Executor) {
			return Plugin.wrap(target, this);
		} else {
			return target;
		}
	}
	
	@Override
	public void setProperties(Properties properties) {
	}
	
	private boolean doInjection(Object object, Class<? extends Annotation> annotationClass, Object injectData) {
		try {
			Class<?> objectClass = object.getClass();
			Field[] fields = objectClass.getDeclaredFields();
			for (Field field : fields) {
				if (field.getAnnotation(annotationClass) != null) {
					PropertyDescriptor propertyDescriptor = new PropertyDescriptor(field.getName(), objectClass);
					Method writeMethod = propertyDescriptor.getWriteMethod();
					writeMethod.invoke(object, injectData);
				}
			}
			return true;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
}
