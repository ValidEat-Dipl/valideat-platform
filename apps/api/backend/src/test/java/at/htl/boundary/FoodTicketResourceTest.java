package at.htl.boundary;

import at.htl.AuthenticatedTest;
import io.quarkus.test.junit.QuarkusTest;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

@QuarkusTest
class FoodTicketResourceTest extends AuthenticatedTest {

    // ---------------------------------------------------------
    // GET
    // ---------------------------------------------------------

    @Test
    void shouldGetAllTickets() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetTicketById() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/1")
                .then()
                .statusCode(anyOf(is(200), is(404)));
    }

    @Test
    void shouldGetTicketsByEmployee() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/findByEmployee/1")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetAdminOverviewInfoBox() {
        Map<String, Object> response =
                given()
                        .auth().oauth2(testToken())
                        .queryParam("last12Months", false)
                        .when()
                        .get("/foodticket/admin-overview-info-box")
                        .then()
                        .statusCode(200)
                        .contentType("application/json")
                        .extract()
                        .as(Map.class);

        assertThat(response.get("Mitarbeitereinträge"), notNullValue());
        assertThat(response.get("Physische Markerl erfasst"), notNullValue());
        assertThat(response.get("Offen"), notNullValue());
        assertThat(response.get("Abgeglichen"), notNullValue());
        assertThat(response.get("Konflikte"), notNullValue());
        assertThat(response.get("Archiviert"), notNullValue());
    }

    @Test
    void shouldGetAdminTickets() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/listAdminTickets")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetClearingTable() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/table-clearing")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetExportInfoBox() {
        Map<String, Object> response =
                given()
                        .auth().oauth2(testToken())
                        .when()
                        .get("/foodticket/export-info-box")
                        .then()
                        .statusCode(200)
                        .contentType("application/json")
                        .extract()
                        .as(Map.class);

        assertThat(response.get("Gesamt"), notNullValue());
        assertThat(response.get("Abgeglichene/ Archivierte Tickets"), notNullValue());
        assertThat(response.get("Offene Konflikte"), notNullValue());
    }

    @Test
    void shouldGetClearingInfoBox() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/clearing-info-box")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetExpiredTickets() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/expired")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldGetValidTickets() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/getAllValidTickets")
                .then()
                .statusCode(200)
                .contentType("application/json");
    }

    @Test
    void shouldExportTicketsAsCsv() {
        given()
                .auth().oauth2(testToken())
                .when()
                .get("/foodticket/export-csv")
                .then()
                .statusCode(200)
                .contentType(containsString("text/csv"))
                .header("Content-Disposition", containsString("foodtickets.csv"));
    }

    // ---------------------------------------------------------
    // DELETE
    // ---------------------------------------------------------

    @Test
    void shouldReturnNotFoundWhenDeletingUnknownTicket() {
        given()
                .auth().oauth2(testToken())
                .when()
                .delete("/foodticket/999999")
                .then()
                .statusCode(404);
    }

    // ---------------------------------------------------------
    // PUT
    // ---------------------------------------------------------

    @Test
    void shouldReturnBadRequestWhenAssigningUnknownTickets() {
        given()
                .auth().oauth2(testToken())
                .when()
                .put("/foodticket/assignTickets/999999/999998")
                .then()
                .statusCode(400);
    }

    @Test
    void shouldReturnNotFoundWhenEditingUnknownTicket() {
        given()
                .auth().oauth2(testToken())
                .contentType("application/json")
                .body("""
                    {
                        "employeeName": "Max Mustermann",
                        "date": "2026-09-27",
                        "tier": "EMPLOYEE",
                        "costOrder": "1000 - Verwaltung",
                        "restaurantName": "Test Restaurant"
                    }
                    """)
                .when()
                .put("/foodticket/999999/1")
                .then()
                .statusCode(404);
    }

    // ---------------------------------------------------------
    // POST
    // ---------------------------------------------------------

    @Test
    void shouldRejectInvalidEmployeeTicket() {
        given()
                .auth().oauth2(testToken())
                .contentType("application/json")
                .body("""
                    {
                        "employeeName": "Does Not Exist",
                        "date": "2026-09-27",
                        "tier": "EMPLOYEE",
                        "costOrder": "1000 - Verwaltung",
                        "restaurantName": "Test Restaurant"
                    }
                    """)
                .when()
                .post("/foodticket/empAddTicketEntry")
                .then()
                .statusCode(400);
    }
}
