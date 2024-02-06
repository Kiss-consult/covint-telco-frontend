import { List_of_numbers } from 'src/app/models/list_of_numbers/list_of_numbers';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'
import { Sound } from 'src/app/models/sound/sound';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-phonenumbersmanagement',
  templateUrl: './phonenumbersmanagement.component.html',
  styleUrls: ['./phonenumbersmanagement.component.css']
})
export class PhonenumbersmanagementComponent {
  noFileMessage: string = `nincs file még feltöltve`;
  uploadedMessage: string = "";
  fileName: string = "";
  submit: boolean = false;
  listname: string = "";
  list : List_of_numbers = new List_of_numbers;
  lists: List_of_numbers[] = [];

  dataSource!: MatTableDataSource<List_of_numbers>;

  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['id', 'name', 'timestamp','calllist'];
  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor(public backendService: BackendService, private location: Location, private router: Router,private _Activatedroute:ActivatedRoute) {

    this.backendService.getAllList().subscribe(
      result => {
        if (result.isErr()) {
          alert("hanganyagok listája sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        this.lists = result.unwrap();
        this.dataSource = new MatTableDataSource(this.lists);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

        // this.dataSource.data = this.illnesses; // Az adatforrás frissítése
        console.log("hanganyagok  listája sikeres betöltés");
        console.log(this.lists);





      });




  }



  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log( this.listname)
    this.listname = this.listname.split(" ").join("");


   

    if (file) {
      if (file.name.endsWith(".csv") === false) {
        alert(`:Wrong file format error message:Wrong file format. Please upload a csv file.`)
        return;
      }
      console.log("eredeti", file.name);



      this.fileName = file.name;
      console.log("uj", this.fileName);
      this.uploadedMessage = this.fileName + "  " + "listanév:" + "  " + this.listname + "  " + "feltöltve";

    }
    try {
      let result = this.backendService.uploadFile(file, this.listname);

      console.log(result)



    }
    catch (error) {

      alert(`File feltölts sikertelen`)
    }
    event.target.value = null;

  }
public DownloadCSVtemplate () {

  let filename = "telefon_lista_example.csv"
  this.backendService.downloadCSVTemplate().subscribe((result) => {
    if (result.isErr()) {
      console.error(result.unwrapErr());
      return;
    }
    let response = result.unwrap();
    let data = response[0];
    let dataType = response[1];
    console.log("letoltesnel data"  + data )
    console.log("letoltesnel datatype"  + dataType )
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(data, { type: dataType }));

    

    if (filename)
      downloadLink.setAttribute('download', filename);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  });
}





  public setSubmit() {
    this.submit = true;
  }
  public callList(list: List_of_numbers){
    console.log("telefon lista",list)
    console.log("id",list.id)
     let id = list.id;
      this.router.navigate(
          ['/list', id]
      ); 
  }
}












