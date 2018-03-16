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
        customer,
        goodMember
    }

    /**
     * 用户登录Id
     * */
//    @NotNull
    private String memberId;
    /**
     * 登录密码
     * */
    private String password;
    private String name;
    /**
     * 权限值
     * 0 系统管理员
     * 1 合同部用户
     * 2 销售部用户
     * 3 客户部用户
     * 4 客户
     * 5 产品部用户
     * */
//    @NotNull
    private RoleModel role;
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

    public RoleModel getRole() {
        return role;
    }

    public void setRole(RoleModel role) {
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

    @Override
    public String toString() {
        return "MemberModel{" +
                "memberId='" + memberId + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", role=" + role +
                ", sex=" + sex +
                ", age=" + age +
                '}';
    }
}
