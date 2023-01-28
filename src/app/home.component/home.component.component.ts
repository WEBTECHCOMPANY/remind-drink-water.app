import { Component, ElementRef, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"

@Component({
  selector: 'app-home.component',
  templateUrl: './home.component.component.html',
  styleUrls: [
    "../../../node_modules/keen-slider/keen-slider.min.css",
    './home.component.component.scss'
  ]
})
export class HomeComponentComponent {
  @ViewChild("sliderRef") sliderRef: ElementRef<HTMLElement> | any;
  @ViewChild("peso") peso: ElementRef<HTMLElement> | any;

  currentSlide: number = 1;
  dotHelper: Array<Number> = [];
  slider: KeenSliderInstance = null as any;
  respostaLitros: any;
  mostrarRespostaPeso: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.slider = new KeenSlider(this.sliderRef.nativeElement, {
        initial: this.currentSlide,
        slideChanged: (s) => {
          this.currentSlide = s.track.details.rel
        },
      })
      this.dotHelper = [
        ...Array(this.slider.track.details.slides.length).keys(),
      ]
    })
  }

  ngOnDestroy() {
    if (this.slider) this.slider.destroy()
  }

  btnPeso(){
    const valuePeso = this.peso.nativeElement.value;
    let calculaQuantidade: any = valuePeso * 35;
    if(calculaQuantidade.toString().length > 3){
      this.respostaLitros = `${calculaQuantidade.toString().substring(0, 1)} Litros e ${calculaQuantidade.toString().substring(1,5)}ml ao dia.`
      this.mostrarRespostaPeso = true;
    }else{
      this.respostaLitros = `${calculaQuantidade.toString()}ml ao dia.`
      this.mostrarRespostaPeso = true;
    }

  }
}
