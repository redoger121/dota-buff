export class User {
  public account_id: number;
  public avatarfull: string;
  public personaname: string;
  public last_match_time: string;
  public similarity: number;

  constructor(
    account_id: number,
    avatarfull: string,
    personaname: string,
    last_match_time: string,
    similarity: number
  ) {
    this.account_id=account_id;
    this.avatarfull=avatarfull;
    this.personaname=personaname;
    this.last_match_time=last_match_time;
    this.similarity=similarity
  }
}
