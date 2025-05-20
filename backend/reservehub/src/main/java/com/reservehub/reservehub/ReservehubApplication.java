package com.reservehub.reservehub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.reservehub.reservehub")
@EntityScan(basePackages = "com.reservehub.reservehub")
public class ReservehubApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReservehubApplication.class, args);
    }

}
