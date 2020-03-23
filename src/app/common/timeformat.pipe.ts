import { Pipe, PipeTransform } from '@angular/core';

import * as moment from 'moment';

@Pipe({ name: 'timeformat' })


export class TimeFormat implements PipeTransform {
	transform(value): string {
		let date = moment(value).format('HH:mm:ss')
		return date;
	}
}