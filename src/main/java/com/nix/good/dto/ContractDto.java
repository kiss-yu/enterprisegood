package com.nix.good.dto;

import com.nix.good.model.ContractModel;
import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.MemberModel;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ContractDto {

    public ContractDto(ContractModel model) {
        this.contractId = model.getContractId();
        this.createDate = model.getCreateDate();
        this.customer = model.getCustomer();
        this.admin = model.getAdmin();
        this.finish = model.getFinish();
        List<GoodsCountDto> list = new ArrayList<>();
        List<GoodsCountModel> models = model.getGoodCountList();
        if (models != null) {
            for (GoodsCountModel goodsCountModel : models) {
                list.add(new GoodsCountDto(goodsCountModel));
            }
        }
        this.goodCountList = list;
    }


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
    private List<GoodsCountDto> goodCountList;
    /**
     * 合同客户
     * */
    @NotNull
    private MemberModel customer;
    /**
     * 合同签约管理
     * */
    @NotNull
    private MemberModel admin;

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

    public List<GoodsCountDto> getGoodCountList() {
        return goodCountList;
    }

    public void setGoodCountList(List<GoodsCountDto> goodCountList) {
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
