package at.htl.boundary;

import at.htl.AuthenticatedTest;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@QuarkusTest
class SaasAdminResourceTest extends AuthenticatedTest {

    private static final Long TENANT_ID = 1L;

    // ---------------------------------------------------------
    // MODULES
    // ---------------------------------------------------------

    @Test
    void shouldGetTenantModules() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/modules")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldReturnErrorForUnknownTenantModules() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/saas-admin/tenant/999999/modules")
                .then()
                .statusCode(anyOf(is(400), is(404)));
    }

    @Test
    void shouldUpdateTenantModules() {
        given()
                .auth().oauth2(testToken())
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
                .auth().oauth2(testToken())
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/rules")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldUpdateTenantRules() {
        given()
                .auth().oauth2(testToken())
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
                .auth().oauth2(testToken())
                .when()
                .get("/saas-admin/tenant/" + TENANT_ID + "/branding")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldUpdateTenantBrandingDraft() {
        given()
                .auth().oauth2(testToken())
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
                .auth().oauth2(testToken())
                .contentType(ContentType.JSON)
                .when()
                .post("/saas-admin/tenant/" + TENANT_ID + "/branding/publish")
                .then()
                .statusCode(anyOf(is(200), is(204)));
    }

    @Test
    void shouldReturnErrorForUnknownTenantBranding() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/saas-admin/tenant/999999/branding")
                .then()
                .statusCode(anyOf(is(400), is(404)));
    }
}

