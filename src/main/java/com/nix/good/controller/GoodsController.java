package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.GoodsModel;
import com.nix.good.service.impl.GoodsService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/goods")
public class GoodsController extends BaseController{
    @Autowired
    private GoodsService goodsService;
    /**
     * 添加商品
     * */
    @Role({0,2})
    @RequestMapping(value = "/create",method = RequestMethod.POST)
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
    /**
     * 删除商品
     * */
    @Role({0,2})
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public Map<String,Object> delete(@PathVariable("id") Integer id) {
        try {
            goodsService.delete(id);
            return render("code",SUCCESS).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL).build();
    }
    /**
     * 修改
     * */
    @Role({0,2})
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public Map<String,Object> update(@ModelAttribute GoodsModel goodsModel) {
        try {
            goodsService.update(goodsModel);
            render("code",SUCCESS)
                    .render("goods",goodsModel);
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }

    /**
     * 查看商品
     * */
    @Role({0,1,2,3,4})
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Map<String,Object> select(@PathVariable("id") Integer id) {
        try {
            render("code",SUCCESS)
                    .render("goods",goodsService.findById(id));
        }catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }

    /**
     * 获取商品列表
     * */
    @Role({0,1,2,3,4})
    @RequestMapping(value = "/list/{page}",method = RequestMethod.POST)
    public Map<String,Object> list(@PathVariable Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort) {
        List<GoodsModel> list = goodsService.list(page,size,order,sort,null);
        return render("list",list).build();
    }
}
