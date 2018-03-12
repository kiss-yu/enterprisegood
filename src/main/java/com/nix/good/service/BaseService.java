package com.nix.good.service;

import com.nix.good.dao.base.BaseMapper;
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
public abstract class BaseService <M extends BaseModel<M>>{
    protected BaseMapper<M> baseMapper;

    protected abstract void init(BaseMapper<M> mBaseMapper);

    public void add(M model) throws Exception {
        try {
            baseMapper.insert(model);
        }catch (Exception e) {
            throw e;
        }

    }

    /**
     * 批量删除用户
     * @param ids id数组
     * @return
     * @throws Exception 删除失败抛出异常
     * */
    public void delete(Integer[] ids) throws Exception {
        try {
            for (Integer id:ids) {
                delete(id);
            }
        }catch (Exception e) {
            throw e;
        }

    }
    /**
     * 在数据库中删除一个对象
     * @param id 需要删除对象的id值
     * @return
     * @throws Exception 删除失败抛出异常
     * */
    public void delete(Integer id) throws Exception {
        try {
            baseMapper.delete(id);
        }catch (Exception e) {
            throw e;
        }

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
        try {
            baseMapper.update(model);
        }catch (Exception e) {
            throw e;
        }
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
            List<M> find = baseMapper.list(SQLUtil.getOffset(page,size), size,order,sort,conditionsSql);
            return find;
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
            M find = baseMapper.select(id);
            return find;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

}
