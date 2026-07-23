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
      case 'EXPIRED':
        this.color = 'secondary';
        break;
      default:
        this.color = 'primary';
    }

    this.label = this.getLabel(value)
  }

  getAllLabelsForDropDown(): string[] {
    return ["ALL", "OPEN", "CONFLICT", "NEEDS_FIXING", "CHECKED", "EXPIRED"];
  }

  getLabel(value: string) {
    switch (value) {
      case 'OPEN':
        return 'Offen';
      case 'CONFLICT':
        return 'Konflikt';
      case 'NEEDS_FIXING':
        return 'Korrektur erforderlich';
      case 'CHECKED':
        return 'Abgeglichen';
      case 'EXPIRED':
        return 'Verjährt';
      default:
        return '---';
    }
  }
}
