import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { element } from 'protractor';
import { Favorite } from 'src/app/models/favorite';
import { FavoriteDetails } from 'src/app/models/favoriteDetails';
import { Product } from 'src/app/models/product';
import { ProductDetail } from 'src/app/models/productDetail';
import { AuthService } from 'src/app/services/auth.service';
import { FavoriteService } from 'src/app/services/favorite.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  favorites: Favorite[] = []
  favoriteDetails: FavoriteDetails[] = []
  defaultImg = ""
  products:Product
  imageBasePath = environment.imageUrl
  constructor(private favoriteService: FavoriteService,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getDetailsByUserId()
  }

  getDetailsByUserId() {
    this.favoriteService.getDetailsByUserId(this.authService.getCurrentUserId()).subscribe((response) => {
      this.favoriteDetails = response.data
    })
  }
  getDetailsByFilteredAsc() {

    this.favoriteService.getAllDetailsFilteredAscByUserId(this.authService.getCurrentUserId()).subscribe((response)=>{
      this.favoriteDetails = response.data
    })
  
  }
  getDetailsByFilteredDesc() {
    this.favoriteService.getAllDetailsFilteredDescByUserId(this.authService.getCurrentUserId()).subscribe((response)=>{
      this.favoriteDetails = response.data
    })
  
  }
  delete(favorite: Favorite) {
    this.favoriteService.delete(favorite).subscribe((response) => {
      this.toastrService.success(response.message)
    })
  }
  addToCart(product:Product){
    
  }
}
