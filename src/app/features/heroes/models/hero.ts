export class Hero {
  constructor(
    public id: number,
    public name: string
  ) {}

  static fromPlain(obj: Partial<Hero>): Hero {
    return new Hero(obj.id ?? 0, obj.name ?? '');
  }

  get displayName(): string {
    return `${this.name} (#${this.id})`;
  }
}
