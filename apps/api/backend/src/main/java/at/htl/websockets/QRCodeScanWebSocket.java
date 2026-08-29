package at.htl.websockets;

import io.quarkus.websockets.next.*;
import jakarta.inject.Inject;

import java.awt.*;

@WebSocket(path = "/qrCodeScan/{qrCodeId}")
public class QRCodeScanWebSocket {

    @Inject
    WebSocketConnection connection;

    @OnOpen(broadcast = true)
    public String onOpen(){
        return "Websocket for QRCode Nr. " + connection.pathParam("qrId") + " was opened.";
    }
    @OnClose()
    public void onClose() {
        System.out.println("Websocket for QRCode Nr. " + connection.pathParam("qrId") + " was closed.");

    }

}
