import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SaasState } from '../../services/saas-state.service';
import { contrastWithWhite } from '../../services/branding-colors';

@Component({
  selector: 'app-saas-branding-preview-page',
  imports: [RouterLink],
  templateUrl: './branding-preview-page.html',
  styleUrl: './branding-preview-page.scss',
})
export class SaasBrandingPreviewPage {

  state = inject(SaasState);


  get brand() {

    const tenant = this.state.details();
    const selectedId = this.state.selectedId();

    if (selectedId !== null) {

      const savedBranding = this.state.branding[selectedId];

      if (savedBranding) {
        return savedBranding;
      }

    }


    let appName = 'ValidEat';
    let primaryColor = '#0d6efd';
    let accentColor = '#20c997';


    if (tenant) {

      appName = tenant.name;

      if (tenant.primaryColor) {

        // schauen obs n hex code is mittels regex
        if (/^#[0-9a-f]{6}$/i.test(tenant.primaryColor)) {
          primaryColor = tenant.primaryColor;
        }

      }

      if (tenant.accentColor) {

        // auch hier
        if (/^#[0-9a-f]{6}$/i.test(tenant.accentColor)) {
          accentColor = tenant.accentColor;
        }

      }

    }


    return {
      appName: appName,
      initials: 'VE',
      primaryColor: primaryColor,
      accentColor: accentColor
    };

  }


  get readable() {

    const contrast = contrastWithWhite(this.brand.primaryColor);

    if (contrast >= 4.5) {
      return true;
    }

    return false;
  }

}
