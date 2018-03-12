package com.nix.good.model;


import com.nix.good.model.base.BaseModel;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotNull;

/**
 *
 * @author 11723
 */
public class MemberModel extends BaseModel<MemberModel> {
    public enum Role{
        admin,
        contractMember,
        salesMember,
        customerMember,
        customer
    }

    /**
     * 用户登录Id
     * */
    @NotNull
    private String memberId;
    /**
     * 登录密码
     * */
    @NotNull
//    @Length(min = 32,max = 32)
    private String password;
    private String name;
    /**
     * 权限值
     * 0 系统管理员
     * 1 合同部用户
     * 2 销售部用户
     * 3 客户部用户
     * 4 客户
     * */
    @NotNull
    private Integer role;
    private Boolean sex;
    private Integer age;

    public String getMemberId() {
        return memberId;
    }

    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getRole() {
        return role;
    }

    public void setRole(Integer role) {
        this.role = role;
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

}
