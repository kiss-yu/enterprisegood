package com.nix.good.controller;

import com.nix.good.service.impl.MemberService;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

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
    @RequestMapping("/{id}")
    public Map<String,Object> select(@PathVariable Integer id) {
        return render("member",memberService.findById(id));
    }
}
