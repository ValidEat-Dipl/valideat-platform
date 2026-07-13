export class Status {
  public color: string;

  constructor(public value: { key: string; label: string }) {
    switch (value.key) {
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
  }
}
