package at.htl.websockets;

import io.quarkus.websockets.next.*;
import jakarta.inject.Inject;

import java.awt.*;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@WebSocket(path = "/qrCodeScan/{qrCodeId}")
public class QRCodeScanWebSocket {

    private static final Map<String, WebSocketConnection> connections =
            new ConcurrentHashMap<>();

    @OnOpen(broadcast = true)
    public void onOpen(WebSocketConnection connection){
        String qrCodeId = connection.pathParam("qrCodeId");

        connections.put(qrCodeId, connection);

        System.out.println("Employee created qrCode" + qrCodeId);
    }
    @OnClose()
    public void onClose(WebSocketConnection connection) {
        String qrCodeId = connection.pathParam("qrCodeId");

        connections.remove(qrCodeId);

        System.out.println("WebSocket closed for QR-Code: " + qrCodeId);

    }

    public static void notifyScan(String qrCodeId) {

        WebSocketConnection connection = connections.remove(qrCodeId);

        if (connection == null) {

            System.out.println("No Websocket Connection possible for this QR-Code: " + qrCodeId);

            return;
        }

        connection.sendText("SCAN_SUCCESS")
                .subscribe()
                .with(unused -> System.out.println("Scan was a success: " + qrCodeId), Throwable::printStackTrace);
    }

}
