export class Status {
  public color: string;
  public label: string;

  constructor(public value: string) {
    switch (value) {
      case 'OPEN':
        this.color = 'info';
        break;
      case 'CONFLICT':
        this.color = 'danger';
        break;
      case 'NEEDS_FIXING':
        this.color = 'warning';
        break;
      case 'CHECKED':
        this.color = 'success';
        break;
      default:
        this.color = 'primary';
    }

    switch (value) {
      case 'OPEN':
        this.label = 'Offen';
        break;
      case 'CONFLICT':
        this.label = 'Konflikt';
        break;
      case 'NEEDS_FIXING':
        this.label = 'Korrektur erforderlich';
        break;
      case 'CHECKED':
        this.label = 'Abgeglichen';
        break;
      default:
        this.label = '---';
    }
  }
}
