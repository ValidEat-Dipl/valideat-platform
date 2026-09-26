import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import type { IScannerControls } from '@zxing/browser';
import { CurrentUserService } from '../../../../admin/services/current-user-service';
import { RestaurantHeader } from '../../../components/restaurant-header/restaurant-header';
import { RestaurantTicketService } from '../../../services/restaurant-ticket.service';

@Component({
  selector: 'app-scan-page',
  imports: [RestaurantHeader, ReactiveFormsModule],
  templateUrl: './scan-page.html',
  styleUrl: './scan-page.scss',
})
export class ScanPage implements OnInit, OnDestroy {
  @ViewChild('cameraPreview') cameraPreview!: ElementRef<HTMLVideoElement>;

  token = new FormControl('', { nonNullable: true, validators: Validators.required });

  isChecking = signal(false);
  isStartingCamera = signal(false);
  cameraActive = signal(false);

  cameraError = signal('');
  errorMessage = signal('');
  scannedTicket = signal<{ id: number; firstName: string; lastName: string; restaurantName: string } | null>(null);

  private scannerControls?: IScannerControls;
  private cameraRunId = 0;

  constructor(
    private restaurantTicketService: RestaurantTicketService,
    private currentUserService: CurrentUserService,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!this.currentUserService.getUser()) {
      this.router.navigate(['/restaurant/user/login']);
    }
  }

  ngOnDestroy(): void {
    this.stopCamera();
  }

  async startCamera(): Promise<void> {
    if (this.cameraActive()) {
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia || !window.isSecureContext) {
      this.cameraError.set('Die Kamera benötigt einen unterstützten Browser und HTTPS oder localhost.');
      return;
    }


    this.cameraError.set('');
    this.errorMessage.set('');
    this.scannedTicket.set(null);

    this.cameraActive.set(true);
    this.isStartingCamera.set(true);
    this.changeDetectorRef.detectChanges();

    // Wenn man die Seite verlässt, während die Berechtigung noch offen ist,
    // soll die Kamera danach nicht doch noch weiterlaufen.
    const runId = ++this.cameraRunId;

    try {
      const { BrowserQRCodeReader } = await import('@zxing/browser');
      const reader = new BrowserQRCodeReader();

      const controls = await reader.decodeFromConstraints(
        { audio: false, video: { facingMode: 'environment' } },
        this.cameraPreview.nativeElement,
        (result, _error, scanControls) => {
          if (!result || !this.cameraActive()) {
            return;
          }

          // Nur den ersten erkannten Code verwenden.
          scanControls.stop();
          this.stopCamera();

          this.token.setValue(result.getText());
          this.checkToken();
        },
      );

      if (runId !== this.cameraRunId) {
        controls.stop();
        return;
      }

      this.scannerControls = controls;
      this.isStartingCamera.set(false);

    } catch (error) {
      if (runId !== this.cameraRunId) {
        return;
      }

      this.stopCamera();
      const name = error instanceof DOMException ? error.name : '';

      if (name === 'NotAllowedError') {
        this.cameraError.set('Der Kamerazugriff wurde verweigert. Bitte die Berechtigung im Browser erlauben.');
      } else if (name === 'NotFoundError') {
        this.cameraError.set('Es wurde keine Kamera gefunden.');
      } else {
        this.cameraError.set('Die Kamera konnte nicht gestartet werden. Bitte Token manuell eingeben.');
      }
    }
  }

  stopCamera(): void {
    this.cameraRunId++;

    this.scannerControls?.stop();
    this.scannerControls = undefined;

    this.cameraActive.set(false);
    this.isStartingCamera.set(false);
  }

  checkToken(): void {
    const qrToken = this.token.value.trim();
    if (!qrToken || this.isChecking()) {
      this.token.markAsTouched();
      return;
    }

    if (this.cameraActive()) {
      this.stopCamera();
    }

    this.isChecking.set(true);
    this.errorMessage.set('');
    this.scannedTicket.set(null);

    // Der Token kommt entweder aus dem Textfeld oder von der Kamera.
    this.restaurantTicketService.scanQRCode(qrToken).subscribe({
      next: (ticket) => {
        this.isChecking.set(false);
        this.scannedTicket.set(ticket);

        this.token.setValue('');
      },
      error: (error: HttpErrorResponse) => {
        this.isChecking.set(false);

        if (error.status === 401 || error.status === 403) {
          this.errorMessage.set('Der Code konnte nicht eingelöst werden. Bitte Anmeldung und Code prüfen.');
        } else if (error.status === 400) {
          this.errorMessage.set('Der QR-Code ist ungültig oder abgelaufen.');
        } else {
          this.errorMessage.set('Die Prüfung ist momentan nicht möglich. Bitte Verbindung prüfen und erneut versuchen.');
        }
      },
    });
  }
}
