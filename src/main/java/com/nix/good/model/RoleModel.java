package com.nix.good.model;

import com.nix.good.model.base.BaseModel;

public class RoleModel extends BaseModel<RoleModel>{
    private String name;
    private Integer value;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getValue() {
        return value;
    }

    public void setValue(Integer value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "RoleModel{" +
                "name='" + name + '\'' +
                ", value=" + value +
                '}';
    }
}
