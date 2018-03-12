package com.nix.good.dao;

import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.MemberModel;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

/**
 * @author 11723
 */
@Repository
public interface MemberMapper extends BaseMapper<MemberModel>{
    MemberModel login(@Param("memberId")String memberId, @Param("password")String password);
}
