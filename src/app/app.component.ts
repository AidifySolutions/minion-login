import { Component, ViewChild, ElementRef } from '@angular/core';
import { style, animate, AnimationBuilder, AnimationPlayer } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  values: string = '';
  currentLength: number = 0;

  // @ts-ignore
  animationPlayer: AnimationPlayer;
  // @ts-ignore
  @ViewChild('minionEyes', { static: true }) minionEyes: ElementRef;

  constructor(
    private animBuilder: AnimationBuilder
  ) {}

  // @ts-ignore
  activeMinion(event: any) {
    this.values = event.target.value;
    this.currentLength = this.values.length;

    if (this.currentLength === 0 && event.key === 'Backspace') {
      return false;
    } else {
      if (event.key === 'Backspace') {
        this.currentLength = this.currentLength - 1;
      } else {
        this.currentLength = this.currentLength + 1;
      }
      this.updateProgress();
    }
  }

  updateProgress(): void {
    const progressAnimation = this.animBuilder.build([
      animate(`430ms`, style({
        'left': `calc(-22px + ${this.currentLength}px)`
      }))
    ]);
    this.animationPlayer = progressAnimation.create(this.minionEyes.nativeElement);
    this.animationPlayer.play();
  }
}
