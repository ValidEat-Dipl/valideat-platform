package at.htl.boundary;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.eclipse.microprofile.jwt.JsonWebToken;

@ApplicationScoped
public class TenantService {

    @Inject
    JsonWebToken jwt;

    public Long getCurrentTenantId() {
        System.out.println("tenantId claim: " + jwt.getClaim("tenantId"));
        return Long.valueOf(jwt.getClaim("tenantId").toString());
    }
}
