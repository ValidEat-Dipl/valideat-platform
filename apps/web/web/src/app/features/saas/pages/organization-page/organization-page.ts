import { ChangeDetectorRef, Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { SaasState } from '../../services/saas-state.service';

@Component({
  selector: 'app-saas-organization-page',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './organization-page.html',
  styleUrl: './organization-page.scss',
})
export class SaasOrganizationPage implements OnInit, OnDestroy {

  saved = signal(false);

  private tenantSubscription: Subscription | undefined;
  private formTenantId: number | null | undefined;

  rulesForm = new FormGroup({
    days: new FormControl('Mo–Fr', Validators.required),
    restaurantRequired: new FormControl(true),
    correction: new FormControl('', Validators.maxLength(300)),
  });


  constructor(
    public state: SaasState,
    private changeDetectorRef: ChangeDetectorRef,
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

    if (tenantId === this.formTenantId) {
      return;
    }

    this.formTenantId = tenantId;


    let draft;

    if (tenantId !== null) {
      draft = this.state.rules[tenantId];
    }


    let days = 'Mo–Fr';
    let restaurantRequired = true;
    let correction = '';


    if (draft) {

      if (draft.days) {
        days = draft.days;
      }

      if (draft.restaurantRequired !== null && draft.restaurantRequired !== undefined) {
        restaurantRequired = draft.restaurantRequired;
      }

      if (draft.correction) {
        correction = draft.correction;
      }
    }


    this.rulesForm.reset({
      days: days,
      restaurantRequired: restaurantRequired,
      correction: correction,
    });

    this.saved.set(false);

    this.changeDetectorRef.markForCheck();
  }


  save(): void {

    if (this.rulesForm.invalid) {

      this.rulesForm.markAllAsTouched();

      return;
    }


    const tenantId = this.state.selectedId();

    if (tenantId === null) {
      return;
    }


    const formValues = this.rulesForm.value;

    const days = formValues.days;
    const restaurantRequired = formValues.restaurantRequired;
    const correction = formValues.correction;


    if (days === null || days === undefined) {
      return;
    }

    if (restaurantRequired === null || restaurantRequired === undefined) {
      return;
    }

    if (correction === null || correction === undefined) {
      return;
    }


    this.state.rules[tenantId] = {
      days: days,
      restaurantRequired: restaurantRequired,
      correction: correction,
    };

    this.saved.set(true);
  }


  ngOnDestroy(): void {

    if (this.tenantSubscription) {
      this.tenantSubscription.unsubscribe();
    }
  }
}