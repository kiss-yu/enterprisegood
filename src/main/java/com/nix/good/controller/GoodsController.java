package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.GoodsModel;
import com.nix.good.service.impl.GoodsService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;

import java.util.Map;

public class GoodsController extends BaseController{
    @Autowired
    private GoodsService goodsService;
    @Role({0})
    public Map<String,Object> add(@ModelAttribute GoodsModel goodsModel) {
        try {
            goodsService.add(goodsModel);
            return render("code",SUCCESS)
                    .render("goods",goodsModel)
                    .build();

        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL)
                .render("goods",goodsModel)
                .build();
    }
}
