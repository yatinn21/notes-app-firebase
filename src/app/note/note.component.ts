import { Component, OnInit } from '@angular/core';
import { NoteService } from '../note.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note } from '../note';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteData: any =[];
  noteObj: Note ={
    id: '',
    note_title: '',
    note_desc: ''
  }

  noteForm! : FormGroup;
  editForm! : FormGroup;
  noteDetails: any ;

  constructor(private fb: FormBuilder, private noteService: NoteService, private spinner : NgxSpinnerService){
    this.noteForm = fb.group({
      title: ['',Validators.required],
      description: ['',Validators.required],
    });
    this.editForm = fb.group({
      edit_title: ['',Validators.required],
      edit_description: ['',Validators.required],
    })
  }

  ngOnInit(): void {
    this.getAllNotes();
  }

  addNote(){
    const {value} = this.noteForm;
    // //console.log(value);
    this.noteObj.id = '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_desc = value.description;

    this.noteService.addNote(this.noteObj).then((res) => {
      if(res){
        //console.log('Note added successfully');
        this.noteForm.reset();
      }
    }) 
  }       

  getAllNotes(){
    this.spinner.show();
    this.noteService.getNotes().subscribe((res) =>{
      //console.log(res);
      this.noteData = res;
      this.spinner.hide();
    })
  }

  getAllDetails(note: Note){
    this.noteDetails = note;
  }

  deleteNote(note: Note) {
    let decision = confirm('Are you sure you want to delete this note?');
    if(decision == true){
      this.noteService.deleteNote(note);
    }
  }

  updateNote(note : Note) {
    const {value} = this.editForm;
    //console.log(value);
    // debugger;
    (this.noteObj.id = note.id ?? ""),
    (this.noteObj.note_title = value.edit_title),
    (this.noteObj.note_desc = value.edit_description);
    //console.log(this.noteObj);

    this.noteService.updateNote(this.noteDetails, this.noteObj).then(() => {
      alert("Note updated successfully");
    });
    this.editForm.reset();
  }
}
