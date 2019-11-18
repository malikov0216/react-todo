import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationTool = props => {
		let { pageNumber } = props
		return (
				<div>
						<Pagination aria-label="Page navigation example">

								<PaginationItem>
										<PaginationLink first />
								</PaginationItem>

								<PaginationItem>
										<PaginationLink previous />
								</PaginationItem>

								<PagesCount pageNumber={pageNumber} onPageChangeHandler={props.onPageChangeHandler}/>

								<PaginationItem>
										<PaginationLink next href="#" />
								</PaginationItem>

								<PaginationItem>
										<PaginationLink last href="#" />
								</PaginationItem>
						</Pagination>
				</div>
		);
};

const PagesCount = props => {
		let arrOfPaginationItem = [];
		for (let i = 1; i <= props.pageNumber; i++) {

				let toolItem =
						<PaginationItem key={i}>
								<PaginationLink onClick={() => props.onPageChangeHandler(i)}>
										{i}
								</PaginationLink>
						</PaginationItem>;

				arrOfPaginationItem.push(toolItem)
		}
		return arrOfPaginationItem
};

export default PaginationTool;