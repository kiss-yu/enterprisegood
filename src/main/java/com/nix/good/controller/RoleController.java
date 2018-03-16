package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.RoleModel;
import com.nix.good.service.RoleService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/role")
public class RoleController extends BaseController{
    @Autowired
    private RoleService roleService;
    @Role(0)
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public Map<String,Object> create(@ModelAttribute RoleModel model) {
        try {
            roleService.add(model);
            render("code",SUCCESS).render("role",model);
        } catch (Exception e) {
            render("code",FAIL);
            e.printStackTrace();
        }
        return build();
    }
    @Role(0)
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Map<String,Object> update(@ModelAttribute RoleModel model) {
        try {
            roleService.update(model);
            render("code",SUCCESS).render("role",model);
        } catch (Exception e) {
            render("code",FAIL);
            e.printStackTrace();
        }
        return build();
    }
    @Role(0)
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Map<String,Object> update(@RequestParam("ids") Integer[] ids) {
        try {
            roleService.delete(ids);
            render("code",SUCCESS);
        } catch (Exception e) {
            render("code",FAIL);
            e.printStackTrace();
        }
        return build();
    }
    @Role({0,3})
    @RequestMapping(value = "/list",method = RequestMethod.POST)
    public Map<String,Object> list(@RequestParam(value = "page",defaultValue = "1")  Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort,
                                   @RequestParam(value = "field",defaultValue = "") String field,
                                   @RequestParam(value = "content",defaultValue = "") String content) {
        List<RoleModel> list;
        page = -1;
        if (!field.isEmpty() && !content.isEmpty()) {
            list = roleService.list(page,size,order,sort,"`" + field + "`" + " like \"%" + content + "%\"");
        }else {
            list = roleService.list(page,size,order,sort,null);
        }
        return render("list",list).render("code",SUCCESS).build();
    }
}
