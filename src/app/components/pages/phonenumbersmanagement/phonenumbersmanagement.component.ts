import { Component ,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'


@Component({
  selector: 'app-phonenumbersmanagement',
  templateUrl: './phonenumbersmanagement.component.html',
  styleUrls: ['./phonenumbersmanagement.component.css']
})
export class PhonenumbersmanagementComponent {
  
  
  goBackToPrevPage(): void {
    this.location.back();
  }
  constructor( public backendService: BackendService,private location: Location) {
       
  }

  noFileMessage: string = `nincs file még feltöltve`;
  uploadedMessage : string = "";
  fileName: string = "";
  submit : boolean = false;
  listname: string = "";

  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    
    
    if (file) {
      if (file.name.endsWith(".csv") === false) {
        alert(`:Wrong file format error message:Wrong file format. Please upload a csv file.`)
        return;
      }
      console.log("eredeti", file.name);
       
      
          this.fileName = file.name;
          console.log("uj", this.fileName);
          this.uploadedMessage = this.fileName + "  " + "listanév:"+ "  " + this.listname  + "  " + "feltöltve";
          
      }
        try {
          let result =  this.backendService.uploadFile(file, this.listname);
         
         console.log(result)
        
        
         
        }
        catch (error) {
        
          alert(`File feltölts sikertelen`)
        }
      event.target.value = null;

    }
    
  

  public setSubmit() {
    this.submit= true;
  }
  
  }
  











