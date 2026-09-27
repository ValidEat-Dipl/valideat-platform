package at.htl.boundary;

import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
class SaasAdminResourceTest {

    private static final Long TENANT_ID = 1L;

    // ---------------------------------------------------------
    // MODULES
    // ---------------------------------------------------------

    @Test
    void shouldGetTenantModules() {
        given()
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/modules")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldReturnErrorForUnknownTenantModules() {
        given()
                .when()
                .get("/saas-admin/tenant/999999/modules")
                .then()
                .statusCode(anyOf(is(400), is(404)));
    }

    @Test
    void shouldUpdateTenantModules() {
        given()
                .contentType("application/json")
                .body("""
                    {
                        "moduleIds": [1, 2, 3, 4, 5, 6]
                    }
                    """)
                .when()
                .put("/saas-admin/tenant/" + TENANT_ID + "/modules")
                .then()
                .statusCode(anyOf(is(200), is(204)));
    }

    // ---------------------------------------------------------
    // RULES
    // ---------------------------------------------------------

    @Test
    void shouldGetTenantRules() {
        given()
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/rules")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldUpdateTenantRules() {
        given()
                .contentType("application/json")
                .body("""
                    {
                        "usageDays": [
                            "MONDAY",
                            "TUESDAY",
                            "WEDNESDAY",
                            "THURSDAY",
                            "FRIDAY"
                        ],
                        "restaurantRequired": true,
                        "correctionHints": true
                    }
                    """)
                .when()
                .put("/saas-admin/tenant/" + TENANT_ID + "/rules")
                .then()
                .statusCode(anyOf(is(200), is(204)));
    }

    // ---------------------------------------------------------
    // BRANDING
    // ---------------------------------------------------------

    @Test
    void shouldGetTenantBranding() {
        given()
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/branding")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldUpdateTenantBrandingDraft() {
        given()
                .contentType("application/json")
                .body("""
                    {
                        "draftAppName": "ValidEat Test",
                        "draftShortName": "VE",
                        "draftPrimaryColor": "#005F99",
                        "draftAccentColor": "#E63946",
                        "draftLogo": null
                    }
                    """)
                .when()
                .put("/saas-admin/tenant/" + TENANT_ID + "/branding")
                .then()
                .statusCode(anyOf(is(200), is(204)));
    }

    @Test
    void shouldPublishTenantBranding() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .post("/saas-admin/tenant/" + TENANT_ID + "/branding/publish")
                .then()
                .statusCode(anyOf(is(200), is(204)));
    }

    @Test
    void shouldReturnErrorForUnknownTenantBranding() {
        given()
                .when()
                .get("/saas-admin/tenant/999999/branding")
                .then()
                .statusCode(anyOf(is(400), is(404)));
    }
}

