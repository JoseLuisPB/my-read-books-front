import { Icountry } from "./country.interface";

export interface IAuthor {
  id: number;
  fullName: string;
  country: Icountry;
}
