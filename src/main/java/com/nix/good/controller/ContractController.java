package com.nix.good.controller;

import com.nix.good.common.Role;
import com.nix.good.dto.ContractDto;
import com.nix.good.model.ContractModel;
import com.nix.good.model.GoodsCountModel;
import com.nix.good.model.GoodsModel;
import com.nix.good.model.MemberModel;
import com.nix.good.service.impl.ContractService;
import com.nix.good.service.impl.GoodsService;
import com.nix.good.service.impl.MemberService;
import com.nix.good.util.MemberManager;
import com.nix.good.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * @author 11723
 */
@Controller
@ResponseBody
@RequestMapping("/contract")
public class ContractController extends BaseController{
    @Autowired
    private ContractService contractService;
    @Autowired
    private MemberService memberService;
    @Autowired
    private GoodsService goodsService;
    /**
     * 创建合同
     * */
    @Role({0,1,4})
    @RequestMapping(value = "/create",method = RequestMethod.POST)
    public Map<String,Object> create(
            @ModelAttribute ContractModel contractModel,
            @RequestParam(value = "customerId",required=false) String customerId,
            @RequestParam(value = "adminId",required=false) String adminId,
            @RequestParam(value = "goodId",required=false) String[] goodIds,
            @RequestParam(value = "count",required=false) Integer[] counts,
            HttpServletRequest request) {
        try {
            MemberModel currentMember = MemberManager.getCurrentUser(request);
            if (currentMember.getRole().getValue() == MemberModel.Role.admin.ordinal()) {
                MemberModel consumer = memberService.findById(customerId);
                MemberModel admin = memberService.findById(adminId);
                if (admin == null) {
                    admin = currentMember;
                }
                if (consumer == null || admin == null) {
                    render("code",FAIL);
                }else {
                    contractModel.setCustomer(consumer);
                    contractModel.setAdmin(admin);
                }
            } else if (currentMember.getRole().getValue() == MemberModel.Role.customer.ordinal()) {
                contractModel.setCustomer(currentMember);
            } else if (currentMember.getRole().getValue() == MemberModel.Role.contractMember.ordinal()) {
                MemberModel consumer = memberService.findById(customerId);
                contractModel.setAdmin(currentMember);
                contractModel.setCustomer(consumer);
            }else {
                return render("code",FAIL).build();
            }
            contractModel.setCreateDate(new Date());
            Map map =  contractService.add(contractModel,goodIds,counts);
            if (map != null) {
                map.put("code",FAIL);
                return map;
            }
            render("code",SUCCESS)
                    .render("contract",new ContractDto(contractModel));
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }

    /**
     * 合同部用户确定签约合同
     * */
    @Role({0,1})
    @RequestMapping(value = "/signing",method = RequestMethod.POST)
    public Map<String,Object> signingContract(@ModelAttribute ContractModel contractModel,HttpServletRequest request) {
        try {
            MemberModel admin = MemberManager.getCurrentUser(request);
            if (admin != null &&
                    (admin.getRole().getValue() == MemberModel.Role.admin.ordinal()
                            || admin.getRole().getValue() == MemberModel.Role.contractMember.ordinal())) {
                contractModel.setAdmin(admin);
                contractService.update(contractModel);
                return render("code",SUCCESS).build();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return render("code",FAIL).render("msg","非法签约").build();
    }
    /**
     * 删除合同
     * */
    @Role({0,1})
    @RequestMapping(value = "/delete",method = RequestMethod.POST)
    public Map<String,Object> delete(@RequestParam(value = "id") Integer[] id) {
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
    @Role({0,1})
    @RequestMapping(value = "/update",method = RequestMethod.POST)
    public Map<String,Object> update(@ModelAttribute ContractModel model,
                                     @RequestParam(value = "consumerId",required=false) String consumerId,
                                     @RequestParam(value = "adminId",required=false) String adminId,
                                     @RequestParam(value = "goodId",required=false) String[] goodIds,
                                     @RequestParam(value = "count",required=false) Integer[] counts,
                                     HttpServletRequest request) {
        try {
            MemberModel consumer = memberService.findById(consumerId);
            MemberModel admin = memberService.findById(adminId);
            model.setAdmin(admin);
            model.setCustomer(consumer);
            Map map = contractService.update(model,goodIds,counts);
            if (map != null) {
                map.put("code",FAIL);
                return map;
            }
            render("code",SUCCESS)
                    .render("contract",new ContractDto(model));
        } catch (Exception e) {
            e.printStackTrace();
            render("code",FAIL);
        }
        return build();
    }

    /**
     * 查看合同
     * */
    @Role({0,1,4})
    @RequestMapping(value = "/{id}",method = RequestMethod.GET)
    public Map<String,Object> select(@PathVariable("id") Integer id,HttpServletRequest request) {
        ContractModel model = contractService.findById(id);
        MemberModel currentMember = MemberManager.getCurrentUser(request);
        if (currentMember.getRole().getValue() == 4 && !model.getCustomer().getId().equals(currentMember.getId())) {
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

    /**
     * 获取商品列表
     * */
    @Role({0,1,4})
    @RequestMapping(value = "/list",method = RequestMethod.POST)
    public Map<String,Object> list(@RequestParam(value = "page",defaultValue = "1") Integer page,
                                   @RequestParam(value = "size",defaultValue = "20") Integer size,
                                   @RequestParam(value = "order",defaultValue = "id") String order,
                                   @RequestParam(value = "sort",defaultValue = "ASC") String sort,
                                   @RequestParam(value = "field",defaultValue = "") String field,
                                   @RequestParam(value = "content",defaultValue = "") String content,
                                   HttpServletRequest request) {
        page = -1;
        List<ContractModel> list;
        List<ContractDto> dtoList = null;
        if (MemberManager.getCurrentUser(request).getRole().getValue() == 4) {
            if (!field.isEmpty() || !content.isEmpty()) {
                list = contractService.list(page,size,order,sort,"`" + field + "`" + " like %" + content + "%" + " and " + " customer = \"" + MemberManager.getCurrentUser(request).getMemberId() + "\"");
            }else {
                list = contractService.list(page,size,order,sort," customer = \"" + MemberManager.getCurrentUser(request).getMemberId() + "\"");
            }
        }else {
            if (!field.isEmpty() || !content.isEmpty()) {
                list = contractService.list(page,size,order,sort,"`" + field + "`" + " like \"%" + content + "%\"");
            }else {
                list = contractService.list(page,size,order,sort,null);
            }
        }
        if (list != null) {
                dtoList = new ArrayList<>();
                for (ContractModel contractModel:list) {
                    dtoList.add(new ContractDto(contractModel));
                }
        }
        return render("list",dtoList).render("code",SUCCESS).build();
    }
}
