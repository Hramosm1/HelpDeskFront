import {TimeHMSPipe} from './time-hms.pipe';

describe('TimeHMSPipe', () => {
	it('transform 63 to 00:01:03', () => {
		const pipe = new TimeHMSPipe();
		expect(pipe.transform(63)).toBe('00:01:03');
	});
});
