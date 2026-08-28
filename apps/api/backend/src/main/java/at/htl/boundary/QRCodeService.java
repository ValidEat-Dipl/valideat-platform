package at.htl.boundary;

import io.nayuki.qrcodegen.QrCode;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.Objects;

@ApplicationScoped
public class QRCodeService {
    public QrCode generateQrCode(String data) {
        QrCode qr = QrCode.encodeText(data, QrCode.Ecc.LOW);
        return qr;
    }

    public static String toSvgString(QrCode qr, int border, String lightColor, String darkColor, boolean download) {
        Objects.requireNonNull(qr);
        Objects.requireNonNull(lightColor);
        Objects.requireNonNull(darkColor);
        if (border < 0)
            throw new IllegalArgumentException("Border must be non-negative");
        long brd = border;
        StringBuilder sb = new StringBuilder();
        if (download) {
            sb.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
            sb.append("<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n");
        }
        sb.append(String.format("<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" viewBox=\"0 0 %1$d %1$d\" stroke=\"none\">\n",
                qr.size + brd * 2));
        sb.append("\t<rect width=\"100%\" height=\"100%\" fill=\"" + lightColor + "\"/>\n");
        sb.append("\t<path d=\"");
        for (int y = 0; y < qr.size; y++) {
            for (int x = 0; x < qr.size; x++) {
                if (qr.getModule(x, y)) {
                    if (x != 0 || y != 0)
                        sb.append(" ");
                    sb.append(String.format("M%d,%dh1v1h-1z", x + brd, y + brd));
                }
            }
        }
        return sb
                .append("\" fill=\"" + darkColor + "\"/>\n")
                .append("</svg>\n")
                .toString();
    }
}
