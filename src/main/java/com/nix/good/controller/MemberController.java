package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.model.MemberModel;
import com.nix.good.service.impl.MemberService;
import com.nix.good.util.MemberManager;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.enterprise.inject.Model;
import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Map;

/**
 * @author 11723
 */
@Controller
@ResponseBody
@RequestMapping("/member")
public class MemberController extends BaseController{
    @Autowired
    private MemberService memberService;
    /**
     * 用户登录
     * */
    @RequestMapping(value = "/login",method = RequestMethod.POST)
    public Map<String,Object> login(String memberId, String password, HttpServletRequest request) {
        MemberModel member = memberService.login(memberId,password);
        if (member != null) {
            MemberManager.addUser(request,member);
        }
        return render("member",member).build();
    }

    /**
     * 用户注销
     * */
    @RequestMapping("/logout")
    public void logout(HttpServletRequest request) {
        MemberManager.deleteUser(request);
    }

    /**
     * 注册/添加用户
     * */
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public Map<String,Object> createMember(@ModelAttribute MemberModel memberModel,HttpServletRequest request,Boolean admin) {
        try {
            if (memberModel.getRole() != MemberModel.Role.customer.ordinal()) {
                if (!admin) {
                    return render("code",FAIL).build();
                }
                if (MemberManager.getCurrentUser(request).getRole() != MemberModel.Role.admin.ordinal() &&
                        MemberManager.getCurrentUser(request).getRole() != MemberModel.Role.customerMember.ordinal()) {
                    return render("code",FAIL).build();
                }
            }
            memberService.add(memberModel);
            if (!admin) {
                MemberManager.addUser(request,memberModel);
                render("member",memberModel);
            }
            return render("code",SUCCESS).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL).build();
    }

    /**
     * 删除用户
     * */
    @Role({0,3})
    @RequestMapping(value = "/delete/{id}",method = RequestMethod.DELETE)
    public Map<String,Object> delete(@PathVariable("id") Integer id) {
        try {
            memberService.delete(id);
            return render("code",SUCCESS).build();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL).build();
    }

    /**
     * 查看用户信息
     * */
    @Role({0,3})
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Map<String,Object> memberMessage(@PathVariable("id") Integer id) {
        return render("member",memberService.findById(id)).build();
    }

    /**
     * 修改用户信息
     * */
    @Role({0,1,2,3,4})
    @RequestMapping(value = "/update",method = RequestMethod.PUT)
    public Map<String,Object> update(@ModelAttribute MemberModel memberModel, HttpServletRequest request) {
        MemberModel currentMember = MemberManager.getCurrentUser(request);
        if (currentMember == null) {
            return render("code",FAIL)
                    .render("msg","非法修改").build();
        }else {
            if (currentMember.getRole() != MemberModel.Role.admin.ordinal() && !currentMember.getId().equals(memberModel.getId())) {
                return render("code",FAIL)
                        .render("msg","非法修改").build();
            }
        }
        try {
            memberService.update(memberModel);
            render("code",SUCCESS)
                    .render("member",memberModel);
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
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
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort) {
        List<MemberModel> list = memberService.list(page,size,order,sort,null);
        return render("list",list).build();
    }
}
