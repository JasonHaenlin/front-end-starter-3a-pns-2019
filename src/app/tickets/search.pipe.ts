import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], field1: string, field2: string, value: string): any[] {

    if (!items) {
      return [];
    }
    if (!field1 || !field2 || !value) {
      return items;
    }

    return items
      .filter(singleItem => singleItem[field1] + singleItem[field2]
        .toLowerCase()
        .includes(value.toLowerCase()))
      .slice(0, 6);
  }
}
