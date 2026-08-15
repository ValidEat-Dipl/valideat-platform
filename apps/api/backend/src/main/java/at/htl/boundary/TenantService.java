package at.htl.boundary;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.jwt.JsonWebToken;

@ApplicationScoped
public class TenantService {

    @Inject
    JsonWebToken jwt;

    public Long getCurrentTenantId() {
        return Long.valueOf(jwt.getClaim("tenantId").toString());
    }
}
