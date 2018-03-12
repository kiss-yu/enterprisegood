package com.nix.good.service.impl;

import com.nix.good.dao.GoodsMapper;
import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.GoodsModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class GoodsService extends BaseService<GoodsModel>{
    @Autowired
    private GoodsMapper goodsMapper;

}
