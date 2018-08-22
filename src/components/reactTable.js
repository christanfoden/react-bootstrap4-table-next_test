import React, { Component } from "react";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider from "react-bootstrap-table2-toolkit";

const { users } = this.state;
console.log(this);

componentDidMount() {
    fetch(
      "https://courses.theleangrouponlinetraining.com/mpsowners/customers.ashx"
    )
      .then(response => response.json())
      // .then(users => console.log(users))
      .then(users => {
        this.setState({ users: users });
      });
  }

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    {" "}
    Showing {from} to {to} of {size} Results
  </span>
);

const options = {
  // page: 0, // Specify the current page. It's necessary when remote is enabled
  // sizePerPage, // Specify the size per page. It's necessary when remote is enabled
  // totalSize, // Total data size. It's necessary when remote is enabled
  pageStartIndex: 0, // first page will be 0, default is 1
  paginationSize: 3, // the pagination bar size, default is 5
  showTotal: true, // display pagination information
  sizePerPageList: [
    {
      text: "5",
      value: 5
    },
    {
      text: "10",
      value: 10
    },
    {
      text: "All",
      value: users.length
    }
  ], // A numeric array is also available: [5, 10]. the purpose of above example is custom the text
  withFirstAndLast: false, // hide the going to first and last page button
  alwaysShowAllBtns: true, // always show the next and previous page button
  firstPageText: "First", // the text of first page button
  prePageText: "Prev", // the text of previous page button
  nextPageText: "Next", // the text of next page button
  lastPageText: "Last", // the text of last page button
  nextPageTitle: "Go to next", // the title of next page button
  prePageTitle: "Go to previous", // the title of previous page button
  firstPageTitle: "Go to first", // the title of first page button
  lastPageTitle: "Go to last", // the title of last page button
  hideSizePerPage: true, // hide the size per page dropdown
  hidePageListOnlyOnePage: true, // hide pagination bar when only one page, default is false
  // onPageChange: (page, sizePerPage) => {}, // callback function when page was changing
  // onSizePerPageChange: (sizePerPage, page) => {}, // callback function when page size was changing
  paginationTotalRenderer: customTotal // custom the pagination total
};

const columns = [
  {
    dataField: "FirstName",
    text: "Name",
    sort: true,
    filter: textFilter()
  },
  {
    dataField: "EmailAddress",
    text: "Email",
    sort: true,
    filter: textFilter()
  },
  {
    dataField: "LastName",
    text: "Phone",
    sort: true,
    filter: textFilter()
  }
];

const expandRow = {
  renderer: row => (
    <div>
      <h4>Id: {row.Id}</h4>
      {/* <p>{row.company.catchPhrase}</p> */}
    </div>
  )
};

const MyExportCSV = props => {
  const handleClick = () => {
    props.onExport();
  };
  return (
    // <div>
    <button
      className="btn btn-success"
      onClick={handleClick}
      style={{ margin: 25 }}
    >
      Click me to export CSV
    </button>
    // </div>
  );
};

{/* <ToolkitProvider
            keyField="EmailAddress"
            data={users}
            columns={columns}
            exportCSV={true}
          >
            {props => (
              <div>
                <MyExportCSV {...props.csvProps} />
                <hr />
                <BootstrapTable
                  {...props.baseProps}
                  border={false}
                  hover
                  striped
                  condensed
                  responsive
                  size="sm"
                  expandRow={expandRow}
                  bootstrap4={true}
                  filter={filterFactory(options)}
                  pagination={paginationFactory()}
                />
              </div>
            )}
          </ToolkitProvider> */}