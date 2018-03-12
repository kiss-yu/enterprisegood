package com.nix.good.controller;

import com.nix.good.model.MemberModel;
import com.nix.good.service.impl.MemberService;
import com.nix.good.util.MemberManager;
import com.nix.good.web.controller.BaseController;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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
        return render("user",member);
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
    @RequestMapping("/create")
    public Map<String,Object> createMember(@ModelAttribute MemberModel memberModel,HttpServletRequest request,Boolean admin) {
        try {
            if (memberModel.getRole() != MemberModel.Role.customer) {
                if (!admin) {
                    return render("code",FAIL);
                }
                if (MemberManager.getCurrentUser(request).getRole() != MemberModel.Role.admin &&
                        MemberManager.getCurrentUser(request).getRole() != MemberModel.Role.customerMember) {
                    return render("code",FAIL);
                }
            }
            memberService.add(memberModel);
            if (!admin) {
                MemberManager.addUser(request,memberModel);
            }
            return render("code",SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL);
    }

    /**
     * 删除用户
     * */
    public Map<String,Object> delete(int id) {
        try {
            memberService.delete(id);
            return render("code",SUCCESS);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL);
    }

    /**
     * 获取用户列表
     * */
    public Map<String,Object> list(@RequestParam(value = "page",defaultValue = "0") Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort) {
        List<MemberModel> list = memberService.list(page,size,order,sort,null);
        return render("list",list);
    }
}
