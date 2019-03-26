import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from './loader';
import { LoaderService } from './loader.service';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
}

) export class LoaderComponent implements OnInit, OnDestroy {

  public load: number;
  show = false;
  private timer;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.load = 0;
    this.startProgress();
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState) => {
      this.show = state.show;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  startProgress() {
    const max = 70;
    this.timer = setInterval(() => {
      this.load += max;
      if (this.load > max) {
        this.load = 0;
      }
    }, 1000);
  }

  stopProgress() {
    clearInterval(this.timer);
    this.load = 0;
  }

}
