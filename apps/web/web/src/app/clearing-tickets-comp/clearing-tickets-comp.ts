import {Component, inject} from '@angular/core';
import {NavComp} from '../nav-comp/nav-comp';
import {ButtonComp} from '../button-comp/button-comp';
import {InfoFlexComp} from '../info-flex-comp/info-flex-comp';
import {TableComp} from '../table-comp/table-comp';
import {InfoFlexService} from '../info-flex-service';
import {TableDataService} from '../table-data-service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {debounceTime, distinctUntilChanged, Subject, switchMap} from 'rxjs';

@Component({
  selector: 'app-clearing-tickets-comp',
  imports: [
    NavComp,
    ButtonComp,
    InfoFlexComp,
    TableComp,
    ReactiveFormsModule
  ],
  templateUrl: './clearing-tickets-comp.html',
  styleUrl: './clearing-tickets-comp.css',
})
export class ClearingTicketsComp {

  tableService = inject(TableDataService)
  infoContainerService = inject(InfoFlexService)

  mapInfoContainer = this.infoContainerService.getInfoContainerMap()
  dataTable = this.tableService.getTableData()

  form = inject(FormBuilder)
    .nonNullable.group({
      person: [''],
      dateTicket: [''],
      costRank: [''],
      costDepartment: [''],
      status: [''],
    })

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
