package com.nix.good.service.impl;

import com.nix.good.dao.MemberMapper;
import com.nix.good.model.MemberModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 11723
 */
@Service
public class MemberService extends BaseService<MemberModel>{
    @Autowired
    private MemberMapper memberMapper;

    @Override
    public MemberModel findById(Integer id) {
        return memberMapper.select(id);
    }
}
