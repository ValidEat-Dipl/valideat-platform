import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SaasState } from '../../services/saas-state.service';
import { contrastWithWhite } from '../../services/branding-colors';

@Component({
  selector: 'app-saas-branding-page',
  imports: [ReactiveFormsModule],
  templateUrl: './branding-page.html',
  styleUrl: './branding-page.scss',
})
export class SaasBrandingPage implements OnInit, OnDestroy {

  saved = signal(false);

  private tenantSubscription: Subscription | undefined;


  brandingForm = new FormGroup({

    appName: new FormControl('ValidEat', [
      Validators.required,
      Validators.maxLength(80)
    ]),

    initials: new FormControl('VE', [
      Validators.required,
      Validators.maxLength(3)
    ]),

    primaryColor: new FormControl('#0d6efd', [
      Validators.required,
      Validators.pattern(/^#[0-9a-f]{6}$/i) // valider hex code
    ]),

    accentColor: new FormControl('#20c997', [
      Validators.required,
      Validators.pattern(/^#[0-9a-f]{6}$/i) // valider hex code
    ])

  });


  constructor(
    public state: SaasState,
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {

  }


  ngOnInit(): void {

    this.loadForm();

    this.tenantSubscription = this.state.tenantChanged.subscribe(() => {

      this.loadForm();

    });

  }


  loadForm(): void {

    const tenantId = this.state.selectedId();
    const tenant = this.state.details();

    let draft;

    if (tenantId !== null) {
      draft = this.state.branding[tenantId];
    }


    let appName = 'ValidEat';
    let initials = 'VE';

    let primaryColor = '#0d6efd';
    let accentColor = '#20c997';


    if (tenant) {

      appName = tenant.name;

      primaryColor = this.validColor(
        tenant.primaryColor,
        '#0d6efd'
      );

      accentColor = this.validColor(
        tenant.accentColor,
        '#20c997'
      );

    }


    if (draft) {

      if (draft.appName !== null && draft.appName !== undefined) {
        appName = draft.appName;
      }

      if (draft.initials !== null && draft.initials !== undefined) {
        initials = draft.initials;
      }

      if (draft.primaryColor !== null && draft.primaryColor !== undefined) {
        primaryColor = draft.primaryColor;
      }

      if (draft.accentColor !== null && draft.accentColor !== undefined) {
        accentColor = draft.accentColor;
      }

    }


    this.brandingForm.reset({
      appName: appName,
      initials: initials,
      primaryColor: primaryColor,
      accentColor: accentColor
    });


    this.saved.set(false);

    this.changeDetectorRef.markForCheck();

  }


  validColor(value: string | null | undefined, fallback: string): string {

    if (value) {

      if (/^#[0-9a-f]{6}$/i.test(value)) {
        return value;
      }

    }

    return fallback;

  }


  getContrast(): string {

    let color = this.brandingForm.value.primaryColor;

    if (!color) {
      color = '#0d6efd';
    }

    return contrastWithWhite(color).toFixed(2);

  }


  isReadable(): boolean {

    let color = this.brandingForm.value.primaryColor;

    if (!color) {
      color = '#0d6efd';
    }

    return contrastWithWhite(color) >= 4.5;

  }


  save(): void {

    if (this.brandingForm.invalid) {

      this.brandingForm.markAllAsTouched();

      return;
    }


    const tenantId = this.state.selectedId();


    if (tenantId === null) {
      return;
    }

    if (this.state.detailLoading()) {
      return;
    }

    if (this.state.detailError()) {
      return;
    }


    const formValues = this.brandingForm.value;

    const appName = formValues.appName;
    const initials = formValues.initials;
    const primaryColor = formValues.primaryColor;
    const accentColor = formValues.accentColor;


    if (!appName || !initials || !primaryColor || !accentColor) {
      return;
    }


    if (!appName.trim()) {
      return;
    }

    if (!initials.trim()) {
      return;
    }


    this.state.branding[tenantId] = {

      appName: appName.trim(),
      initials: initials.trim(),

      primaryColor: primaryColor,
      accentColor: accentColor

    };


    this.saved.set(true);

  }


  openPreview(): void {

    this.saved.set(false);

    this.save();


    if (this.saved()) {
      this.router.navigate(['/saas/branding-preview']);
    }

  }


  ngOnDestroy(): void {

    if (this.tenantSubscription) {
      this.tenantSubscription.unsubscribe();
    }

  }

}