package com.nix.good.model;

import com.nix.good.model.base.BaseModel;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @author 11723
 */
public class GoodsModel extends BaseModel<GoodsModel>{
    /**
     * 商品id
     * */
    @NotNull
    private String goodId;
    /**
     * 商品名称
     * */
    @NotNull
    private String name;
    /**
     * 商品添加日期
     * */
    private Date createDate;
    /**
     * 库存
     * */
    private Integer inventory;

    /**
     * 单价
     * */
    @NotNull
    private BigDecimal price;

    public String getGoodId() {
        return goodId;
    }

    public void setGoodId(String goodId) {
        this.goodId = goodId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Integer getInventory() {
        return inventory;
    }

    public void setInventory(Integer inventory) {
        this.inventory = inventory;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "GoodsModel{" +
                "goodId='" + goodId + '\'' +
                ", name='" + name + '\'' +
                ", inventory=" + inventory +
                '}';
    }
}
