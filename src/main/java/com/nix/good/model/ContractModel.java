package com.nix.good.model;

import com.nix.good.model.base.BaseModel;

import javax.validation.constraints.NotNull;
import java.util.Date;
import java.util.List;

/**
 * @author 11723
 */
public class ContractModel extends BaseModel<ContractModel>{
    /**
     * 合同编号
     * */
    @NotNull
    private String contractId;
    /**
     * 合同创建日期
     * */
    private Date createDate;
    /**
     * 合同商品列表
     * */
    private List<GoodsCountModel> goodCountList;
    /**
     * 合同客户
     * */
    private MemberModel customer;
    /**
     * 合同签约管理
     * */
    private MemberModel admin;
    /**
     * 是否完成签约
     * */
    private Boolean finish;

    public Boolean getFinsh() {
        return finish;
    }

    public void setFinsh(Boolean finish) {
        this.finish = finish;
    }

    public String getContractId() {
        return contractId;
    }

    public void setContractId(String contractId) {
        this.contractId = contractId;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public List<GoodsCountModel> getGoodCountList() {
        return goodCountList;
    }

    public void setGoodCountList(List<GoodsCountModel> goodCountList) {
        this.goodCountList = goodCountList;
    }

    public MemberModel getCustomer() {
        return customer;
    }

    public void setCustomer(MemberModel customer) {
        this.customer = customer;
    }

    public MemberModel getAdmin() {
        return admin;
    }

    public void setAdmin(MemberModel admin) {
        this.admin = admin;
    }
}
