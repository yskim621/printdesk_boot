package kr.co.printingworks.printdesk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class PrintdeskApplication {

    public static void main(String[] args) {
        SpringApplication.run(PrintdeskApplication.class, args);
    }

}
