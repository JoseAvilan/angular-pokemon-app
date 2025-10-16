import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: 'img[appLazyLoad]',
  standalone: true
})
export class LazyImageDirective implements OnInit {
  @Input() src: string = '';
  
  constructor(private el: ElementRef) {}

  ngOnInit() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.el.nativeElement.src = this.src;
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    
    this.el.nativeElement.src = 'assets/placeholder.png'; // Imagen placeholder
    obs.observe(this.el.nativeElement);
  }
}