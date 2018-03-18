package com.nix.good.dao;

import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.GoodsCountModel;
import org.apache.ibatis.annotations.Param;

/**
 * @author 11723
 */
public interface GoodsCountMapper extends BaseMapper<GoodsCountModel>{
    void deleteByKey(@Param("contractId")String contractId, @Param("goodId")String goodId);
}
