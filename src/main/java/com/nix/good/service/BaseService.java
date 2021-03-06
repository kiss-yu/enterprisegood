package com.nix.good.service;

import com.nix.good.model.base.BaseModel;
import com.nix.good.util.SQLUtil;
import com.nix.good.util.log.LogKit;
import org.springframework.stereotype.Service;

import java.lang.reflect.Method;
import java.util.List;

/**
 *
 * @author 11723
 * @date 2017/5/4
 *
 * service实现接口的基本类
 * 实现了对继承{@link BaseModel}的model基础的增删改查接口
 */
@Service
public class BaseService <M extends BaseModel<M>>{


    /**
     * 反射执行执行dao方法（有时间改为动态代理）
     * @param methodName 需要执行的dao方法名
     * @param clazzs 方法参数对象组类类型（为了反射时找到具体方法）
     * @param objects 调用方法参数组（执行方法需要的参数）
     * @return 返回方法执行结果
     * @throws Exception 抛出反射执行过程中出现的异常
     * */
    private Object invokeMapperMethod(String methodName,Class[] clazzs,Object ... objects) throws Exception {
        LogKit.info(this.getClass(),"执行" + methodName + "方法");
        try {
            Object o = SpringContextHolder.getBean(this.getClass().getSimpleName().toLowerCase().replaceFirst("service","Mapper"));
            Class<?> clazz = o.getClass();
            Method method = clazz.getMethod(methodName, clazzs);
            return method.invoke(o,objects);
        }catch (Exception e){
            throw e;
        }
    }
    /**
     * 去dao中找具体的方法
     * @param methodName 需要找的方法名
     * @param model 与dao绑定的model类
     * */
    private void callInvoke(String methodName,M model) throws Exception {
        invokeMapperMethod(methodName,new Class[]{BaseModel.class},model);
    }
    public void add(M model) throws Exception {
        if (model == null) {
            throw new Exception("model cannot is null");
        }
        callInvoke("insert",model);
    }

    /**
     * 批量删除用户
     * @param ids id数组
     * @return
     * @throws Exception 删除失败抛出异常
     * */
    public void delete(Integer[] ids) throws Exception {
        if (ids == null) {
            throw new Exception("ids cannot is null");
        }
        for (Integer id:ids) {
            delete(id);
        }
    }
    /**
     * 在数据库中删除一个对象
     * @param id 需要删除对象的id值
     * @return
     * @throws Exception 删除失败抛出异常
     * */
    public void delete(Integer id) throws Exception {
        if (id == null) {
            throw new Exception("id cannot is null");
        }
        invokeMapperMethod("delete",new Class[]{Integer.class},id);
    }
    /**
     *
     * 更新数据库中某个对象
     * @param model 需要更新的对象
     * @return
     * @throws Exception 修改失败抛出异常
     *
     * */
    public void update(M model) throws Exception {
        if (model == null) {
            return;
        }
        callInvoke("update",model);
    }


    /**
     *
     * 查找某个相应条件的对象列表
     * @param page 列表分页页数
     * @param size 当前页需要查询对象的最大数量
     * @param order 查找对象时按照哪个字段排序
     * @param sort 排序时的排序方式（升序 降序）
     * @param conditionsSql 查找列表时的sql条件  sql语=语句里where后面的部分都写在改字符串里
     * @return 返回符合条件的对象列表 但查找失败时返回null
     * */
    public List<M> list(Integer page,Integer size,String order,String sort,String conditionsSql){
        try {
            Object find = invokeMapperMethod("list", new Class[]{Integer.class,Integer.class,String.class,String.class,String.class},
                    SQLUtil.getOffset(page,size), size,order,sort,conditionsSql);
            return (List<M>) find;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     *
     * 根据唯一id值查找某个对象
     * @param id 查找的id值
     * @return 返回查找到的对象 查找失败返回空值
     *
     * */
    public M findById(Integer id){
        try {
            Object find = invokeMapperMethod("select",new Class[]{Integer.class},id);
            return (M) find;
        }catch (Exception e){
            return null;
        }
    }

    public M findById(String id){
        try {
            Object find = invokeMapperMethod("selectByStringId",new Class[]{String.class},id);
            return (M) find;
        }catch (Exception e){
            return null;
        }
    }

}
