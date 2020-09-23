import { OnDestroy, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsersProvider implements OnDestroy{

	users = new BehaviorSubject([]);

	subscription;

	constructor( private userService: UserService){
		this.loadUsers();
	}

	loadUsers(){
		this.subscription = this.userService.getUsers().subscribe( response => {
			const usersData : User[] = response.map( e => {
				return {
					id: e.payload.doc.id,
					cellulare: e.payload.doc.data()['cellulare'],
					password: e.payload.doc.data()['password'],
				};
			});
			this.users.next(usersData);
		});
	}

	getUsers(): Observable<User[]>{
		return this.users.asObservable();
	}

	addUser(user: User){
		return this.userService.addUser(user);
	}

	updateUser(user: User){
		const record = {};
		record['cellulare']= user.cellulare;
		record['password'] = user.password;
		this.userService.updateUser(user.id, record);
	}

	deleteUser(id){
		this.userService.deleteUser(id);
	}

	ngOnDestroy(){
		this.users.unsubscribe();
	}

}