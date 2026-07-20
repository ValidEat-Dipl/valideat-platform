import { Component, computed, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-info-flex-comp',
  imports: [],
  templateUrl: './info-flex-comp.html',
  styleUrl: './info-flex-comp.css',
})
export class InfoFlexComp {
  data: InputSignal<Record<string, number> | undefined> = input<Record<string, number>>();
  dataEntries = computed(() => Object.entries(this.data() ?? {}));
}
