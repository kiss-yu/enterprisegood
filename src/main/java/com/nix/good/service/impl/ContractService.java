package com.nix.good.service.impl;

import com.nix.good.dao.ContractMapper;
import com.nix.good.dao.GoodsCountMapper;
import com.nix.good.dao.SalesMapper;
import com.nix.good.model.ContractModel;
import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.GoodsModel;
import com.nix.good.model.SalesLogModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author 11723
 */
@Service
public class ContractService extends BaseService<ContractModel>{
    @Autowired
    private ContractMapper contractMapper;
    @Autowired
    private SalesMapper salesLogMapper;
    @Autowired
    private GoodsCountMapper goodsCountMapper;

    public void add(ContractModel model,String[] goodIds,Integer[] counts) throws Exception {
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        super.add(model);
        if (goodIds != null){
            for (int i = 0;i < goodIds.length;i ++) {
                GoodsModel goodsModel = new GoodsModel();
                GoodsCountModel goodsCountModel = new GoodsCountModel();
                goodsModel.setGoodId(goodIds[i]);
                goodsCountModel.setGoods(goodsModel);
                goodsCountModel.setContract(model);
                goodsCountModel.setCount(counts[i]);
                goodsCountMapper.insert(goodsCountModel);
                SalesLogModel salesLogModel = new SalesLogModel();
                salesLogModel.setCount(counts[i]);
                salesLogModel.setCreateDate(new Date());
                salesLogModel.setGood(goodsModel);
                salesLogModel.setMember(model.getCustomer());
                salesLogModel.setContract(model);
                salesLogModel.setDescribe(format.format(new Date()) + model.getCustomer().getName() + "签约" + goodsModel.getGoodId() + " 数量：" + counts[i]);
                salesLogMapper.insert(salesLogModel);
            }
        }
    }
}
