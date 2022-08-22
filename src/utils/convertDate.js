export class convertDate {
  constructor(timestamp) {
    this.date = new Date(timestamp * 1000);
  }

  get dateString() {
    return `${this.date.toLocaleDateString()} ${this.date.toLocaleTimeString()}`;
  }

  get ISOString() {
    return this.date.toISOString();
  }
}