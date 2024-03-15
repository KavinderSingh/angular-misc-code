import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitAndCapitalize'
})
export class SplitAndCapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    // Convert camel case to human-readable format
    return value
      .replace(/([a-z])([A-Z])/g, '$1 $2') 
      .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2') 
      .replace(/^./, (str: string) => str.toUpperCase()); 
  }

}
