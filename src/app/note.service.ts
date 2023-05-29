import { Injectable } from '@angular/core';
import { Note } from './note';
import { Firestore, addDoc, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fs: Firestore) { }

  addNote(note: Note) {
    note.id = doc(collection(this.fs, 'id')).id;
    return addDoc(collection(this.fs, 'Notes'),note)
  }

  getNotes(): Observable<Note[]>{
    let notesRef = collection(this.fs , 'Notes');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }

  deleteNote(note: Note) {
    let docRef = doc(this.fs ,`Notes/${note.id}`);
    return deleteDoc(docRef)
  }

  updateNote(oldNote: Note, newNote: any) {
    let docRef = doc(this.fs ,`Notes/${oldNote.id}`);
    return updateDoc(docRef, newNote)
  }

}
