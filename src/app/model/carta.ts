import { User } from './user';

export interface Carta{
	id?: string;
	user: User;
	number: number;
	exp_year: number;
	exp_month: number;
	token?: any;
	cvc: number;
}
