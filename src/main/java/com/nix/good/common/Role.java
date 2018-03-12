package com.nix.good.common;

import java.lang.annotation.*;

@Target( {ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface Role {
    int[] value();
}
