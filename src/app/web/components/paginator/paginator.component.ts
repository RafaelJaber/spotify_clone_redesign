import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface Paginator {
  nextPageUrl: URL | null;
  previousPageUrl: URL | null;
  offset: number;
  totalElements: number;
}

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.css',
})
export class PaginatorComponent implements OnInit {
  @Input()
  paginator!: Paginator;

  @Output()
  nextEvent: EventEmitter<{ offset: number }> = new EventEmitter<{
    offset: number;
  }>();

  @Output()
  previousEvent: EventEmitter<{ offset: number }> = new EventEmitter<{
    offset: number;
  }>();

  ngOnInit() {
    this.paginator = {
      nextPageUrl: null,
      previousPageUrl: null,
      offset: 0,
      totalElements: 0,
    };
  }

  protected onClickedNextPage(url: URL | null) {
    if (!url) return;
    const offset = Number(url.searchParams.get('offset'));
    this.nextEvent.emit({ offset });
  }

  protected onClickedPreviousPage(url: URL | null) {
    if (!url) return;
    const offset = Number(url.searchParams.get('offset'));
    this.previousEvent.emit({ offset });
  }
}
