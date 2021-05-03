export default class Post {
  private readonly _id: number;
  private _name: string;
  private _title: string;
  private _text: string;
  private _check: boolean;
  private _createAt: string | null;
  private _updateAt: string | null;

  constructor(
    id: number,
    name: string,
    title: string,
    text: string,
    check: boolean,
    createAt: string | null,
    updateAt: string | null
  ) {
    this._id = id;
    this._name = name;
    this._title = title;
    this._text = text;
    this._check = check;
    this._createAt = createAt;
    this._updateAt = updateAt;
  }

  get id(): number {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get title(): string {
    return this._title;
  }

  get text(): string {
    return this._text;
  }

  get check(): boolean {
    return this._check;
  }

  get createAt(): string | null {
    return this._createAt;
  }

  get updateAt(): string | null {
    return this._updateAt;
  }

  changeText(text: string): void {
    this._text = text;
  }

  setChangeCreateAt(createAt: string | null): void {
    this._createAt = createAt;
  }

  get toObject(): Object {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      text: this.text,
      check: this.check,
      createAt: this.createAt,
      updateAt: this.updateAt,
    };
  }
}
