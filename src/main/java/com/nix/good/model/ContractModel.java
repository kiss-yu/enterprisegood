package com.nix.good.model;

import com.nix.good.model.base.BaseModel;
import org.springframework.format.annotation.DateTimeFormat;

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
    @DateTimeFormat(pattern="yyyy-MM-dd")
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

    public Boolean getFinish() {
        return finish;
    }

    public void setFinish(Boolean finish) {
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

    @Override
    public String toString() {
        return "ContractModel{" +
                "contractId='" + contractId + '\'' +
                ", createDate=" + createDate +
                ", goodCountList=" + goodCountList +
                ", customer=" + customer +
                ", admin=" + admin +
                ", finish=" + finish +
                '}';
    }
}
