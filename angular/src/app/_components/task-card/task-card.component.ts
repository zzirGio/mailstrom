import { Component, Input } from '@angular/core';

@Component({
    selector: 'task-card',
    templateUrl: './task-card.component.html',
    styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
    @Input() disabled = false;
    @Input() title = '';
    @Input() description = '';
    @Input() _glyphicon = '';

    @Input('glyphicon')
    public set glyphicon(value) {
        this._glyphicon = `assets/glyphicons/${value}.svg`;
    }
}