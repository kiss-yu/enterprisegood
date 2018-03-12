package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.dto.ContractDto;
import com.nix.good.model.ContractModel;
import com.nix.good.model.MemberModel;
import com.nix.good.service.impl.ContractService;
import com.nix.good.util.MemberManager;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * @author 11723
 */
@Controller
@ResponseBody
@RequestMapping("/Contract")
public class ContractController extends BaseController{
    @Autowired
    private ContractService contractService;
    /**
     * 创建合同
     * */
    @Role({0,2})
    @RequestMapping(value = "/create")
    public Map<String,Object> create(@ModelAttribute ContractModel contractModel) {
        try {
            contractService.add(contractModel);
            render("code",SUCCESS)
                    .render("contract",contractModel);
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }
    /**
     * 删除合同
     * */
    @Role({0,2})
    @RequestMapping("/delete/{id}")
    public Map<String,Object> delete(@PathVariable("id") Integer id) {
        try {
            contractService.delete(id);
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
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Map<String,Object> update(@ModelAttribute ContractModel model) {
        try {
            contractService.update(model);
            render("code",SUCCESS)
                    .render("contract",model);
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }

    /**
     * 查看合同
     * */
    @Role({0,2,4})
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Map<String,Object> select(@PathVariable("id") Integer id,HttpServletRequest request) {
        ContractModel model = contractService.findById(id);
        MemberModel currentMember = MemberManager.getCurrentUser(request);
        if (currentMember.getRole() == 4 && !model.getCustomer().getId().equals(currentMember.getId())) {
            return render("code",FAIL)
                    .render("msg","不合法")
                    .build();
        }
        try {
            render("code",SUCCESS)
                    .render("contract",new ContractDto(model));
        }catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }
}
