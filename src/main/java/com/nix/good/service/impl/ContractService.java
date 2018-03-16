package com.nix.good.service.impl;

import com.nix.good.dao.ContractMapper;
import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.ContractModel;
import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.GoodsModel;
import com.nix.good.model.SalesLogModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Date;

/**
 * @author 11723
 */
@Service
public class ContractService extends BaseService<ContractModel>{
    @Autowired
    private ContractMapper contractMapper;
    @Autowired
    private SalesLogService salesLogService;

    @Override
    public void add(ContractModel model) throws Exception {
        if (model.getGoodCountList() != null){
            for (GoodsCountModel goodsCountModel:model.getGoodCountList()) {
                SalesLogModel salesLogModel = new SalesLogModel();
                salesLogModel.setCount(goodsCountModel.getCount());
                salesLogModel.setCreateDate(new Date());
                salesLogModel.setGood(goodsCountModel.getGoods());
                salesLogModel.setMember(model.getCustomer());
                salesLogModel.setContract(model);
                salesLogService.add(salesLogModel);
            }
        }
        super.add(model);
    }
}
