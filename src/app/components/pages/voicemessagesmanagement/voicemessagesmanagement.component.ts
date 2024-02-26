import { Component, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/services/backend/backend.service';
import { Location } from '@angular/common'
import { Sound } from 'src/app/models/sound/sound';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-voicemessagesmanagement',
  templateUrl: './voicemessagesmanagement.component.html',
  styleUrls: ['./voicemessagesmanagement.component.css']
})
export class VoicemessagesmanagementComponent {

  goBackToPrevPage(): void {
    this.location.back();
  }

  noFileMessage: string = `nincs file még feltöltve`;
  uploadedMessage: string = "";
  fileName: string = "";
  submit: boolean = false;
  sounds: Sound[] = [];
  sound: Sound = new Sound;

  dataSource!: MatTableDataSource<Sound>;

  @ViewChild('paginator')
  paginator!: MatPaginator;
  @ViewChild('empTbSort') empTbSort = new MatSort();
  pageSizeOptions: number[] = [5, 10];

  displayedColumns: string[] = ['Name', 'Url','UploadDate' , 'delete', 'play'];

  Filter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(public backendService: BackendService, private location: Location) {
    this.backendService.getAllSounds().subscribe(
      result => {
        if (result.isErr()) {
          alert("hanganyagok sikertelen betöltés");
          console.error(result.unwrapErr());
          return;
        }
        this.sounds = result.unwrap();
        this.dataSource = new MatTableDataSource(this.sounds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;
       
        console.log("hanganyagok sikeres betöltés");
        console.log(this.sounds);
      });
  }

// upload sound file 
  async onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      if (file.name.endsWith(".wav") === false) {
        alert(`:Wrong file format error message:Wrong file format. Please upload a csv file.`)
        return;
      }
      console.log(file.name);
      this.fileName = file.name;
      this.uploadedMessage = this.fileName + "   " + "feltöltve";
    }
    try {
      let result = this.backendService.uploadSound(file);
      console.log(result)
    }
    catch (error) {
      alert(`HangFile feltölts sikertelen`)
    }
    event.target.value = null;
  }


  public setSubmit() {
    this.submit = true;
  }

// delete selected sound file
  deleteSound(name: string) {
    this.backendService.deleteSound(name).subscribe(
      result => {
        if (result.isErr()) {
          alert("hanganyag sikertelen törlése");
          console.error(result.unwrapErr());
          return;
        }
        alert("hanganyag sikeres törlése");
        //this.dataSource = new MatTableDataSource(this.sounds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.empTbSort;

        this.dataSource.data = this.sounds; // Az adatforrás frissítése
        console.log("hanganyag sikeres törlése");
        console.log(this.sounds);
        window.location.reload();

      });
  }


  public Play(url: string) {
    let audio: HTMLAudioElement = new Audio(url);
    audio.play();
  }

}
