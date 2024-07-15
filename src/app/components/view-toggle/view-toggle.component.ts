import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-toggle.component.html',
  styleUrls: ['./view-toggle.component.css']
})
export class ViewToggleComponent {
  @Output() viewChange = new EventEmitter<'list' | 'grid'>();
  currentView: 'list' | 'grid' = 'grid';

  toggleView(view: 'list' | 'grid') {
    this.currentView = view;
    this.viewChange.emit(view);
  }
}