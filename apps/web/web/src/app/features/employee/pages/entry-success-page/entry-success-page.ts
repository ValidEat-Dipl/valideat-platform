import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeHeader } from '../../components/employee-header/employee-header';
import { EmployeeFoodTicketRequest, QRCodeResponse } from '../../models/employee-food-ticket.model';
import { EmployeeEntryState } from '../../services/employee-entry-state';
import { EmployeeTicketService } from '../../services/employee-ticket.service';

@Component({
  selector: 'app-entry-success-page',
  imports: [EmployeeHeader],
  templateUrl: './entry-success-page.html',
  styleUrl: './entry-success-page.scss',
})
export class EntrySuccessPage implements OnInit, OnDestroy {
  ticket?: EmployeeFoodTicketRequest;
  qrCode?: QRCodeResponse;
  qrImage?: SafeUrl;
  scanned = signal(false);
  connected = signal(false);
  expired = signal(false);
  connectionError = signal(false);

  private socket?: WebSocket;
  private expiryTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private employeeEntryState: EmployeeEntryState,
    private employeeTicketService: EmployeeTicketService,
    private sanitizer: DomSanitizer,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.ticket = this.employeeEntryState.ticket;
    this.qrCode = this.employeeEntryState.qrCode;

    if (!this.ticket || !this.qrCode) {
      this.router.navigate(['/employee/start']);
      return;
    }

    // Angular blockiert SVG-Daten-URLs sonst. Das SVG kommt vom QR-Generator im Backend.
    this.qrImage = this.sanitizer.bypassSecurityTrustUrl(
      `data:image/svg+xml,${encodeURIComponent(this.qrCode.qrCode)}`,
    );


    this.socket = this.employeeTicketService.openScanSocket(this.qrCode.qrCodeId);
    this.socket.onopen = () => {
      this.connected.set(true);
    };

    this.socket.onmessage = (event) => {
      if (event.data === 'SCAN_SUCCESS') {
        this.scanned.set(true);
        this.connectionError.set(false);
        this.socket?.close();
      }
    };

    this.socket.onerror = () => {
      this.connected.set(false);
      this.connectionError.set(true);
    };

    this.socket.onclose = () => {
      this.connected.set(false);

      if (!this.scanned() && !this.expired()) {
        this.connectionError.set(true);
      }
    };

    // Nach fünf Minuten akzeptiert das Backend den Token sowieso nicht mehr.
    this.expiryTimer = setTimeout(() => {
      if (!this.scanned()) {
        this.expired.set(true);
        this.socket?.close();
      }
    }, 5 * 60 * 1000);
  }

  ngOnDestroy(): void {
    if (this.expiryTimer) {
      clearTimeout(this.expiryTimer);
    }
    this.socket?.close();
  }

  goToStart(): void {
    this.employeeEntryState.ticket = undefined;
    this.employeeEntryState.qrCode = undefined;

    this.router.navigate(['/employee/start']);
  }

  formatTicketDate(date: string): string {
    return formatDate(date, 'dd.MM.yyyy', 'en');
  }
}
