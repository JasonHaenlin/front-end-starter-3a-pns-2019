import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {
  public load: number;
  show = true;

  private timer;

  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.load = 50;
    this.startProgress();
  }

  ngOnInit() {
    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startProgress() {
    this.timer = setInterval(() => {
      this.load += 1;
      if (this.load === 105) {
        this.load = 0;
      }
    }, 5);
  }

  stopProgress() {
    clearInterval(this.timer);
    this.load = 0;
  }


}
