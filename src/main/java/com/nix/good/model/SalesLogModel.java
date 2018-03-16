package com.nix.good.model;

import com.nix.good.model.base.BaseModel;

import java.util.Date;

/**
 * @author 11723
 */
public class SalesLogModel extends BaseModel<SalesLogModel>{
    private Date createDate;
    private String describe;
    private Integer count;
    private GoodsModel good;
    private MemberModel member;
    private ContractModel contract;

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public String getDescribe() {
        return describe;
    }

    public void setDescribe(String describe) {
        this.describe = describe;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    public GoodsModel getGood() {
        return good;
    }

    public void setGood(GoodsModel good) {
        this.good = good;
    }

    public MemberModel getMember() {
        return member;
    }

    public void setMember(MemberModel member) {
        this.member = member;
    }

    public ContractModel getContract() {
        return contract;
    }

    public void setContract(ContractModel contract) {
        this.contract = contract;
    }

    @Override
    public String toString() {
        return "SalesLogModel{" +
                "createDate=" + createDate +
                ", describe='" + describe + '\'' +
                ", count=" + count +
                ", good=" + good +
                ", member=" + member +
                ", contract=" + contract +
                '}';
    }
}
