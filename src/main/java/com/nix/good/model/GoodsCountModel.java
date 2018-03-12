package com.nix.good.model;

import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.base.BaseModel;

/**
 * @author 11723
 * 中间表 合同-商品（多对多）
 */
public class GoodsCountModel extends BaseModel<GoodsCountModel>{
    private ContractModel contract;
    private GoodsModel goods;
    private Integer count;

    public ContractModel getContract() {
        return contract;
    }

    public void setContract(ContractModel contract) {
        this.contract = contract;
    }

    public GoodsModel getGoods() {
        return goods;
    }

    public void setGoods(GoodsModel good) {
        this.goods = good;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
