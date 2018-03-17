package com.nix.good.dto;

import com.nix.good.model.GoodsModel;
import com.nix.good.model.MemberModel;
import com.nix.good.model.SalesLogModel;

import java.util.Date;

public class SalesLogDto {
    private Integer id;
    private Date createDate;
    private String describe;
    private Integer count;
    private GoodsModel good;
    private MemberModel member;
    private ContractDto contract;

    public SalesLogDto(SalesLogModel salesLogModel) {
        this.id = salesLogModel.getId();
        this.createDate = salesLogModel.getCreateDate();
        this.describe = salesLogModel.getDescribe();
        this.count = salesLogModel.getCount();
        this.good = salesLogModel.getGood();
        this.member = salesLogModel.getMember();
        if (salesLogModel.getContract() != null) {
            this.contract = new ContractDto(salesLogModel.getContract().getId(), salesLogModel.getContract().getContractId(), salesLogModel.getContract().getCreateDate());
        }
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

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

    public ContractDto getContract() {
        return contract;
    }

    public void setContract(ContractDto contract) {
        this.contract = contract;
    }
}
