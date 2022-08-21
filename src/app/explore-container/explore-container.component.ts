import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from '@capacitor/toast';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if (params.crash) {
        console.log('Crashed!');
        Toast.show({
          text: 'Crashed!',
          position: 'center'
        });
      }
    });
  }

  ngOnInit() {}

/**
 * Source: https://stackoverflow.com/a/16256553/6731412
 */
 startMemoryLeak() {
  let i; let el;

  const createdElements = {};
  const events = [];

  const attachAlert = (element)=> {
    element.onclick = () => {
      alert(element.innerHTML);
    };
  };

  const reallyBadAttachAlert = (element)=> () => alert(element.innerHTML);

  for (i = 0; i < 1000000000; i++) {
    el = document.createElement('div');
    el.innerHTML = i;

    /** posibility one: you're storing the element somewhere **/
    attachAlert(el);
    createdElements['div' + i] = el;

    /** posibility two: you're storing the callbacks somewhere **/
    const event = reallyBadAttachAlert(el);
    events.push(event);
    el.onclick = event;
    console.log(i);
  }
}

}
