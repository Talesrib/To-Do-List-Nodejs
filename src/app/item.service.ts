import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private webRequestService : WebRequestService) { }
  
  addItem (item : any) {
    return this.webRequestService.post('tasks', item);
  }
  
  getItem () {
    return this.webRequestService.get('tasks');
  }
  
  deleteItem(id : string) {
    return this.webRequestService.delete(`tasks/${id}`);
  }
  
  updateItem(id : string, payload : Object ) {
    return this.webRequestService.patch(`tasks/${id}`, payload );
  }
  addUser(user: any) {
    return this.webRequestService.post('register', user);
  }
}
