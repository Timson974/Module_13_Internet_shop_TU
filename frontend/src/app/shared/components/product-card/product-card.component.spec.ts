import {ProductCardComponent} from "./product-card.component";
import {ComponentFixture, TestBed} from "@angular/core/testing";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FavoriteService} from "../../services/favorite.service";
import {of} from "rxjs";
import {ProductType} from "../../../../types/product.type";
import {NO_ERRORS_SCHEMA} from "@angular/core";


describe('product card component', () => {

  let productCardComponent: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;
  let product: ProductType;


  beforeEach(() => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['updateCart']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getIsLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const _snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
    const favoriteServiceSpy = jasmine.createSpyObj('FavoriteService', ['addFavorites', 'removeFavorites']);

    TestBed.configureTestingModule({
      declarations: [ProductCardComponent],
      providers: [
        {provide: CartService, useValue: cartServiceSpy},
        {provide: AuthService, useValue: authServiceSpy},
        {provide: Router, useValue: routerSpy},
        {provide: MatSnackBar, useValue: _snackBarSpy},
        {provide: FavoriteService, useValue: favoriteServiceSpy},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(ProductCardComponent);
    productCardComponent = fixture.componentInstance;

    product = {
      id: 'string',
      name: 'string',
      price: 1,
      image: 'string',
      lightning: 'string',
      humidity: 'string',
      temperature: 'string',
      height: 1,
      diameter: 1,
      url: 'string',
      type: {
        id: 'string',
        name: 'string',
        url: 'string'
      },
    };
    productCardComponent.product = product;
  });

  it( 'should have count init value 1', () => {
    expect(productCardComponent.count).toBe(1);
  });

  it( 'should set value from input countInCart to count', () => {
    productCardComponent.countInCart = 5;
    fixture.detectChanges();
    expect(productCardComponent.count).toBe(5);
  });

  it( 'should call removeFromCart with count 0', () => {
    let cartServiceSpy = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    cartServiceSpy.updateCart.and.returnValue(of({
      items: [
        {
          product: {
            id: '1',
            name: 'string',
            url: 'string',
            image: 'string',
            price: 1
          },
          quantity: 1
        }
      ]
    }));

    productCardComponent.removeFromCart();
    expect(cartServiceSpy.updateCart).toHaveBeenCalledWith(product.id, 0);
  });

  it('should hide product-card-info and product-ard-extra if it is light card', ()=> {
    productCardComponent.isLight = true;

    fixture.detectChanges();

    const componentElement: HTMLElement = fixture.nativeElement;
    const productCardInfo: HTMLElement | null = componentElement.querySelector('.product-card-info');
    const productCardExtra: HTMLElement | null = componentElement.querySelector('.product-card-extra');

    expect(productCardInfo).toBe(null);
    expect(productCardExtra).toBe(null);
  });

  it('should call navigate for light card', ()=> {
    let routerSpay = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productCardComponent.isLight = true;
    productCardComponent.navigate();

    expect(routerSpay.navigate).toHaveBeenCalled();
  });

  it('should not call navigate for full card', ()=> {
    let routerSpay = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    productCardComponent.isLight = false;
    productCardComponent.navigate();

    expect(routerSpay.navigate).not.toHaveBeenCalled();
  });



});