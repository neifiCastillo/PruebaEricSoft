import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['ProductNo', 'ProductName', 'Quantity', 'Price', 'Actions'];
  dataSource = new MatTableDataSource<Products>();
  editingStates: { [key: number]: boolean } = {};
  editedProduct: Products = {
    productNo: 0,
    productName: '',
    quantity: 0,
    price: 0
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _productsServices: ProductsService, private aRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listProducts();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  listProducts() {
    this._productsServices.getProducts().subscribe(data => {
      this.dataSource.data = data;
      console.log(this.dataSource.data);
    }, error => {
      alert('Oops! Ocurrió un error');
    });
  }

  toggleEdit(product: Products) {
    const productNo = product.productNo; 
    this.editedProduct = product; 
    this.editingStates[productNo] = !this.editingStates[productNo];
  }
  
  isEditing(productNo: number): boolean {
    return this.editingStates[productNo];
  }

  saveChanges(productNo: number) {
    this._productsServices.putProducts(productNo, this.editedProduct).subscribe(() => {
      this.editingStates[productNo] = false;
      this.editedProduct = {} as Products; 
    }, error => {
      console.error('Error al editar los cambios:', error);
    });
  }

  editQuantity(productNo: number, product: Products) {
    productNo = product.productNo; 
    this.editedProduct = product; 
    this.editingStates[productNo] = true;
  }
  editPrice(productNo: number, product: Products) {
    productNo = product.productNo; 
    this.editedProduct = product; 
    this.editingStates[productNo] = true;
  }

  cancelEdit(productNo: number) {
    this.editingStates[productNo] = false;
    this.editedProduct = {} as Products; 
    this.listProducts();
  }

  isInvalidQuantity(quantity: any): boolean {
    return isNaN(quantity);
  }

  isInvalidPrice(price: any): boolean {
    return isNaN(price);
  }

  updateEditedQuantity(quantity: number) {
    this.editedProduct.quantity = quantity;
  }

  updateEditedPrice(price: number) {
    this.editedProduct.price = price;
  }
}