package com.nix.good.service.impl;

import com.nix.good.dao.MemberMapper;
import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.MemberModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

/**
 * @author 11723
 */
@Service
public class MemberService extends BaseService<MemberModel>{
    @Autowired
    private MemberMapper memberMapper;

    public MemberModel login(String memberId,String password) {
        return memberMapper.login(memberId,password);
    }
}
