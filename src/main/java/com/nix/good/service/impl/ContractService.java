package com.nix.good.service.impl;

import com.nix.good.dao.ContractMapper;
import com.nix.good.dao.GoodsCountMapper;
import com.nix.good.dao.GoodsMapper;
import com.nix.good.dao.SalesMapper;
import com.nix.good.model.ContractModel;
import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.GoodsModel;
import com.nix.good.model.SalesLogModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

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
    @Autowired
    private GoodsMapper goodsMapper;

    public Map<String,Object> add(ContractModel model, String[] goodIds, Integer[] counts) throws Exception {
        Map<String,Object> map = new HashMap<>();
        List<GoodsCountModel> goodsCountModels = new ArrayList<>();
        if (goodIds != null){
            for (int i = 0;i < goodIds.length;i ++) {
                GoodsModel goodsModel = goodsMapper.selectByStringId(goodIds[i]);
                if (goodsModel == null) {
                    map.put("msg",goodIds[i] + "商品不存在");
                    return map;
                }
                if (goodsModel.getInventory() < counts[i]) {
                    map.put("msg",goodIds[i] + "商品库存不足");
                    return map;
                }
                GoodsCountModel goodsCountModel = new GoodsCountModel();
                goodsModel.setGoodId(goodIds[i]);
                goodsCountModel.setGoods(goodsModel);
                goodsCountModel.setContract(model);
                goodsCountModel.setCount(counts[i]);
                goodsCountModels.add(goodsCountModel);
            }
        }
        model.setGoodCountList(goodsCountModels);
        add(model);
        return null;
    }

    @Override
    public void add(ContractModel model) throws Exception {
        try {
            super.add(model);
            List<GoodsCountModel> goodsCountModelList = model.getGoodCountList();
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
            for (GoodsCountModel goodsCountModel:goodsCountModelList) {
                goodsCountMapper.insert(goodsCountModel);
                SalesLogModel salesLogModel = new SalesLogModel();
                salesLogModel.setCount(goodsCountModel.getCount());
                salesLogModel.setCreateDate(new Date());
                salesLogModel.setGood(goodsCountModel.getGoods());
                salesLogModel.setMember(model.getCustomer());
                salesLogModel.setContract(model);
                salesLogModel.setDescribe(format.format(new Date()) + model.getCustomer().getName() + "签约" + goodsCountModel.getGoods().getGoodId() + " 数量：" + goodsCountModel.getCount());
                salesLogMapper.insert(salesLogModel);
            }
        }catch (Exception e){}
    }
}
