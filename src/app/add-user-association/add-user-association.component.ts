import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-add-user-association',
  standalone: false,
  
  templateUrl: './add-user-association.component.html',
  styleUrl: './add-user-association.component.css'
})
export class AddUserAssociationComponent implements OnInit {

  associations: any[] = [];
  users: any[] = [];
  selectedAssociationId: number | null = null;
  selectedUserId: number | null = null;

  constructor(private http: HttpClient){}

  ngOnInit(): void {
      this.loadAssociations();
      this.loadUsers();
  }

  loadAssociations():void {
    this.http.get('http://localhost:3000/associations').subscribe(
      {
        next: (data: any) => {
          this.associations = data;
        },
      }
    );
  }

  loadUsers(): void{
     this.http.get('http://localhost:3000/users').subscribe((data: any) => {
      this.users = data;
     });
  }

  selectAssociation(associationId: number){
    this.selectedAssociationId = associationId;
  }

  addUserToAssociation(){
    if(this .selectedAssociationId && this.selectedUserId){
      const url = `http://localhost:3000/associations/${this.selectedAssociationId}/users/${this.selectedUserId}`;
      this.http.put(url, {}).subscribe(()=> {
        alert('Utilisateur ajouté à l\'association avec succès !');
        this.selectedAssociationId = null;
        this.selectedUserId = null;
      },
      (err) => {
        console.error('Erreur lors de l\'ajout de l\'utilisateur :', err);
        alert('Erreur lors de l\'ajout de l\'utilisateur.');
      }
    );
    }else{
      alert('Veuillez sélectionner une association et un utilisateur.');
    }
  }

}
