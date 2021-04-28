import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { AddressService } from 'src/app/services/address.service';
import { CityService } from 'src/app/services/city.service';
import { CountryService } from 'src/app/services/country.service';
import { environment } from 'src/environments/environment';
import { FormGroup,FormBuilder ,Validators } from '@angular/forms';
import { City } from 'src/app/models/city';
import { OrderService } from 'src/app/services/order.service';
import { Address } from 'src/app/models/address';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerCreditCard } from 'src/app/models/customerCard';
import { CustomerAddressService } from 'src/app/services/customer-address.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-payment-information',
  templateUrl: './payment-information.component.html',
  styleUrls: ['./payment-information.component.css']
})
export class PaymentInformationComponent implements OnInit {
  products:Product[]=[]
  product:Product
  savedAddress: Address[]=[];
  cities:City[]=[]
  selectedAddress: Address;

  imageBasePath = environment.imageUrl;
  defaultImg="/images/default.jpg"
  createAddressForm:FormGroup
  constructor(
    private addressService:AddressService,
    private cityService:CityService,
    private countryService:CountryService,
    private toastrService:ToastrService,
    private orderService:OrderService,
    private formBuilder:FormBuilder,
    private authService:AuthService,
    private customerAddressService:CustomerAddressService,
    private paymentService:PaymentService
  ) { }

  ngOnInit(): void {
    this.getCity()
    this.setCreditCardForm()
    this.getSavedCards()
  }


  setCreditCardForm(){
    this.createAddressForm = this.formBuilder.group({
      savedAddress: [""],
      cityId: ["", Validators.required],
      addressDetail: ["", Validators.required],
      postalCode: ["", Validators.required],
    })
  }

  // buy(){
  //   if(this.creditCardForm.valid){
  //     let payment:Payment = Object.assign({},this.creditCardForm.value)
  //   }
  // }

  getCity(){
    this.cityService.get().subscribe(response=>{
      this.cities = response.data
    })
  }
  setCardInfos(){
    this.createAddressForm.patchValue(
      this.selectedAddress
    )
  }
  async getSavedCards(){
    let customerId = this.authService.getCurrentUserId();
    let customerCards = (await this.customerAddressService.getByCustomerId(customerId).toPromise()).data
    customerCards.forEach(card => {
      this.addressService.getAddressById(card.addressId).subscribe(response => {
        this.savedAddress.push(response.data)
      })
    });
  }

}