package com.nix.good.dto;

import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.GoodsModel;

public class GoodsCountDto {
    public GoodsCountDto(GoodsCountModel model) {
        this.goods = model.getGoods();
        this.count = model.getCount();
    }
    private GoodsModel goods;
    private Integer count;

    public GoodsModel getGoods() {
        return goods;
    }

    public void setGoods(GoodsModel goods) {
        this.goods = goods;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
