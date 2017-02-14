import { Item } from './item';


export interface Menu {
    Id:Number;
    Name:string;
    Price:Number;
    OnDate:Date;
    Type:Number;
    Items:Item[];
}