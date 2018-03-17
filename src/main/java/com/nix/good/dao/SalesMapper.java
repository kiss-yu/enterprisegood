package com.nix.good.dao;

import com.nix.good.dao.base.BaseMapper;
import com.nix.good.model.SalesLogModel;
import org.springframework.web.bind.annotation.ResponseBody;

@ResponseBody
public interface SalesMapper extends BaseMapper<SalesLogModel>{
}
