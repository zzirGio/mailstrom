import { Component, Input } from '@angular/core';

import { Message } from '@models';

@Component({
  selector: 'app-message-widget',
  templateUrl: './message-widget.component.html',
  styleUrls: ['./message-widget.component.scss']
})
export class MessageWidgetComponent {
  @Input() messages: Message[] = [];
  @Input() title = '';
  @Input() emptyPlaceholder = '';
  @Input() isRecent: boolean = false;
  @Input() _glyphicon = '';

  @Input('glyphicon')
  public set glyphicon(value) {
      this._glyphicon = `assets/glyphicons/${value}.svg`;
  }

  constructor() {}
}
