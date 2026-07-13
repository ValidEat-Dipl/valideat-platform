import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableOverviewComp} from '../table-overview-comp/table-overview-comp';
import {TableDataOverviewService} from '../table-data-overview-service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { InfoFlexServiceClearing } from '../info-flex-service-clearing';
import { TableDataClearingService } from '../table-data-clearing-service';

@Component({
  selector: 'app-clearing-tickets-comp',
  imports: [NavComp, ButtonComp, InfoFlexComp, ReactiveFormsModule, TableOverviewComp],
  templateUrl: './clearing-tickets-comp.html',
  styleUrl: './clearing-tickets-comp.css',
})
export class ClearingTicketsComp {
  tableService = inject(TableDataClearingService);
  infoContainerService = inject(InfoFlexServiceClearing);

  mapInfoContainer = this.infoContainerService.getInfoContainerMap();
  dataTable = this.tableService.getTableData();

  form = inject(FormBuilder).nonNullable.group({
    person: [''],
    dateTicket: [''],
    costRank: [''],
    costDepartment: [''],
    status: [''],
  });

  /*private readonly _autoSearch$: Subject<string> = new Subject<string>();
  private readonly _debounce: number = 500;
  private todos$: any;

  ngOnInit(): void {
    this.todos$ = this._autoSearch$.pipe(
      debounceTime(this._debounce),
      distinctUntilChanged(),
      switchMap((text) => {
        // TODO: REPLACE THIS WITH YOUR OWN HTTP CALL HERE.
        return this._http.get<ITodo[]>(`http://www.some-api.com/todos?search=${text}`);
      })
    );
  }
  public onSearch(text: string) {
    this._autoSearch$.next(text);
  }*/
}
