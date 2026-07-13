package at.htl;

import io.quarkus.elytron.security.common.BcryptUtil;
import org.junit.jupiter.api.Test;

public class PasswordGenerator {

    @Test
    public void generateHash() {
        System.out.println(BcryptUtil.bcryptHash("password123"));
    }
}
