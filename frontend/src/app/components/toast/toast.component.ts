import { Component } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {

  data: any;
  timeout: any;

  constructor(private toastService: ToastService) {
    this.toastService.get()
      .subscribe((data: any) => {
        if (data) {
          clearTimeout(this.timeout);
          this.data = data;
          this.toastService.hide();
          return;
        }
                  
        this.timeout = setTimeout(() => {
          this.data = null;
        }, 10000);
      });
  }
}
