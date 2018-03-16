package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.SalesLogModel;
import com.nix.good.service.impl.SalesLogService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/sales")
public class SalesLogController extends BaseController{
    @Autowired
    private SalesLogService salesLogService;

    @Role(0)
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Map<String,Object> update(@RequestParam("ids") Integer[] ids) {
        try {
            salesLogService.delete(ids);
            render("code",SUCCESS);
        } catch (Exception e) {
            render("code",FAIL);
            e.printStackTrace();
        }
        return build();
    }

    /**
     * 获取用户列表
     * */
    @Role({0,3})
    @RequestMapping(value = "/list",method = RequestMethod.POST)
    public Map<String,Object> list(@RequestParam(value = "page",defaultValue = "1")  Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort,
                                   @RequestParam(value = "field",defaultValue = "") String field,
                                   @RequestParam(value = "content",defaultValue = "") String content) {
        List<SalesLogModel> list;
        if (!field.isEmpty() && !content.isEmpty()) {
            list = salesLogService.list(page,size,order,sort,"`" + field + "`" + " like \"%" + content + "%\"");
        }else {
            list = salesLogService.list(page,size,order,sort,null);
        }
        return render("list",list).render("code",SUCCESS).build();
    }
}
