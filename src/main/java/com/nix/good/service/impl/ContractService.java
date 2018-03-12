package com.nix.good.service.impl;

import com.nix.good.dao.ContractMapper;
import com.nix.good.model.ContractModel;
import com.nix.good.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author 11723
 */
@Service
public class ContractService extends BaseService<ContractModel>{
    @Autowired
    private ContractMapper contractMapper;
}
