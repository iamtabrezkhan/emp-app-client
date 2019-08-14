import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(users: any, string: String): any {
    if(!string) {
      return users;
    }
    return users.filter(user => {
      return (user.name.toLowerCase().indexOf(string.toLowerCase()) != -1) ||
      (user._id.indexOf(string) != -1) ||
      (user.phone.indexOf(string) != -1) ||
      (user.email.toLowerCase().indexOf(string.toLowerCase()) != -1)
    })
  }

}
