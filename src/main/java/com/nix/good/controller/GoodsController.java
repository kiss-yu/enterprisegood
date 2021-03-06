package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.GoodsModel;
import com.nix.good.model.MemberModel;
import com.nix.good.service.impl.GoodsService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Date;
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
    @Role({0,5})
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public Map<String,Object> add(@ModelAttribute GoodsModel goodsModel) {
        try {
            goodsModel.setCreateDate(new Date());
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
    @Role({0,5})
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Map<String,Object> delete(@RequestParam(value = "id") Integer[] id) {
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
    @Role({0,5})
    @RequestMapping(value = "/update",method = RequestMethod.POST)
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
    @Role({0,1,2,3,4,5})
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Map<String,Object> select(@PathVariable("id") Integer id,
                                     @RequestParam(value = "goodId",required = false) String goodId) {
        try {
            if (id == -1) {
                return render("code",SUCCESS)
                        .render("goods",goodsService.findById(goodId)).build();
            }
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
    @Role({0,1,2,3,4,5})
    @RequestMapping(value = "/list",method = RequestMethod.POST)
    public Map<String,Object> list(@RequestParam(value = "page",defaultValue = "1")  Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort,
                                   @RequestParam(value = "field",defaultValue = "") String field,
                                   @RequestParam(value = "content",defaultValue = "") String content) {
        List<GoodsModel> list;
        page = -1;
        if (!field.isEmpty() || !content.isEmpty()) {
            list = goodsService.list(page,size,order,sort,"`" + field + "`" + " like \"%" + content + "%\"");
        }else {
            list = goodsService.list(page,size,order,sort,null);
        }
        return render("list",list).render("code",SUCCESS).build();
    }
}
