/**
 * Tests for reporting API validation utilities.
 *
 * Site Kit by Google, Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import {
	isValidDateRange,
	isValidMetrics,
	isValidOrders,
} from './report-validation';

describe( 'Reporting API validation', () => {
	describe( 'isValidDateRange', () => {
		it( 'should return TRUE if dateRange is valid only', () => {
			expect( isValidDateRange( 'last-14-days', '', null ) ).toBeTruthy();
		} );

		it( 'should return TRUE if startDate and endDate are valid only', () => {
			expect( isValidDateRange( '', '2020-01-01', '2020-04-05' ) ).toBeTruthy();
		} );

		it( 'should return FALSE if neither dateRange nor start/end dates are valid', () => {
			expect( isValidDateRange( 'xxx', '2020', '2020-01' ) ).toBeFalsy();
		} );
	} );

	describe( 'isValidMetrics', () => {
		it( 'should return TRUE if a non empty string is passed', () => {
			expect( isValidMetrics( 'test' ) ).toBeTruthy();
		} );

		it( 'should return TRUE if a valid object is passed', () => {
			expect( isValidMetrics( {
				expression: 'test',
				alias: 'Test',
			} ) ).toBeTruthy();
		} );

		it( 'should return TRUE if a valid array of objects/strings is passed', () => {
			expect( isValidMetrics( [
				{
					expression: 'test',
					alias: 'Test',
				},
				'test2',
				'test3',
				{
					expression: 'test4',
					alias: 'Test4',
				},
			] ) ).toBeTruthy();
		} );

		it( 'should return FALSE if neither string nor array is passed', () => {
			expect( isValidMetrics( 5.2 ) ).toBeFalsy();
		} );

		it( 'should return FALSE if not a valid array of objects/strings is passed', () => {
			expect( isValidMetrics( [
				{
					expression: 'test',
					alias: 'Test',
				},
				'test2',
				5,
				{
					expression: 'test4',
					alias: 'Test4',
				},
			] ) ).toBeFalsy();
		} );
	} );

	describe( 'isValidOrders', () => {
		it( 'should return TRUE if a single valid order object is passed', () => {
			expect( isValidOrders( {
				fieldName: 'city',
				sortOrder: 'ASCENDING',
			} ) ).toBeTruthy();
		} );

		it( 'should return TRUE if multiple valid order objects are passed', () => {
			expect( isValidOrders( [
				{
					fieldName: 'city',
					sortOrder: 'ASCENDING',
				},
				{
					fieldName: 'country',
					sortOrder: 'DESCENDING',
				},
			] ) ).toBeTruthy();
		} );

		it( 'should return FALSE if a non object item is passed in the array', () => {
			expect( isValidOrders( [
				{
					fieldName: 'city',
					sortOrder: 'ASCENDING',
				},
				15,
				{
					fieldName: 'country',
					sortOrder: 'DESCENDING',
				},
			] ) ).toBeFalsy();
		} );

		it( 'should return FALSE if a non object item is passed', () => {
			expect( isValidOrders( 'test' ) ).toBeFalsy();
		} );

		it( 'should return FALSE if invalid sortOrder is passed', () => {
			expect( isValidOrders( {
				fieldName: 'city',
				sortOrder: 'test',
			} ) ).toBeFalsy();
		} );

		it( 'should return FALSE if fieldName is undefined', () => {
			expect( isValidOrders( {
				sortOrder: 'DESCENDING',
			} ) ).toBeFalsy();
		} );
	} );
} );