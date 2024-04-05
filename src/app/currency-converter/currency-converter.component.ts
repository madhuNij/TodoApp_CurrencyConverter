import { Component } from '@angular/core';
import { CurrencyConverter } from './CurrencyConverter';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent {
  text : string = '';
  countries : string[] = [];
  converter: CurrencyConverter;
  selectedFromCountry: string;
  selectedToCountry: string; 
  originalFromCountry: string;
  originalToCountry: string;
  from_amount_value: number;
  to_amount_value: number;
  serverData: any;
  result: string = '';
  constructor(private http: HttpClient){
    this.converter = new CurrencyConverter();
    this.countries = this.converter.country_list;
    this.converter.selectedFromCountry = 'USD';
    this.converter.selectedToCountry = 'INR';
    this.originalFromCountry = this.converter.selectedFromCountry;
    this.originalToCountry = this.converter.selectedToCountry;
    this.from_amount_value = 1;
    this.to_amount_value = 83.44;
    this.result = this.from_amount_value + " " + this.converter.selectedFromCountry + " = " + this.to_amount_value + " " + this.converter.selectedToCountry;

  }


  openModal(){
    const modalDiv = document.getElementById('myModal');
    if(modalDiv != null){
      modalDiv.style.display = 'block';
    }
  }

  closeModal(){
    const modalDiv = document.getElementById('myModal');
    if(modalDiv != null){
      modalDiv.style.display = 'none';
    }
    this.originalFromCountry = this.converter.selectedFromCountry;
    this.originalToCountry = this.converter.selectedToCountry;
    this.result = this.from_amount_value + " " + this.converter.selectedFromCountry + " = " + this.to_amount_value + " " + this.converter.selectedToCountry;
  }

  selected(){
    this.converter.selectedFromCountry = this.originalFromCountry;
    this.converter.selectedToCountry = this.originalToCountry;
    let url = "https://open.er-api.com/v6/latest/" + this.converter.selectedFromCountry;
    this.http.get(url).subscribe((response) => {
      this.serverData = response;
      const rate = this.serverData["rates"][this.converter.selectedToCountry];
      this.from_amount_value = this.serverData["rates"][this.converter.selectedFromCountry];
      this.to_amount_value = (rate);
      this.result = this.from_amount_value + " " + this.converter.selectedFromCountry + " = " + this.to_amount_value + " " + this.converter.selectedToCountry;
    });
  }

  convertToValue(){
    let url = "https://open.er-api.com/v6/latest/" + this.converter.selectedFromCountry;
    this.http.get(url).subscribe((response) => {
      this.serverData = response;
      const rate = this.serverData["rates"][this.converter.selectedToCountry];
      this.to_amount_value = (rate * this.from_amount_value);
      this.result = this.from_amount_value + " " + this.converter.selectedFromCountry + " = " + this.to_amount_value + " " + this.converter.selectedToCountry;
    });
  }

  convertFromValue(){
    let url = "https://open.er-api.com/v6/latest/" + this.converter.selectedToCountry;
    this.http.get(url).subscribe((response) => {
      console.log(response);
      this.serverData = response;
      const rate = this.serverData["rates"][this.converter.selectedFromCountry];
      this.from_amount_value = (rate * this.to_amount_value);
      this.result = this.from_amount_value + " " + this.converter.selectedFromCountry + " = " + this.to_amount_value + " " + this.converter.selectedToCountry;

    });
  }

}
