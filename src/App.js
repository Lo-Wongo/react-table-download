// npm i react-table --save
// npm i react-html-table-to-excel --save


import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import "react-table/react-table.css"; // Css style for tables
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ExportToExcel from './ExportToExcel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount = () => {
    const url = "https://jsonplaceholder.typicode.com/posts";
    fetch(url, {
      method: "GET"
    }).then(response => response.json()).then(posts => {
      // console.log("posts", posts)
      this.setState({ posts: posts })
    })
  }

  deleteRow(id) {
    // console.log("id", id);
    const index = this.state.posts.findIndex(post => {
      return post.id === id
    })
    // console.log("index", index);

    //Remove post from state

    let copyPosts = [...this.state.posts]
    copyPosts.splice(index, 1)

  }

  render() {

    const columns = [ //should match format of jsob object
      {
        Header: "User ID",
        accessor: "userId",
        style: {
          textAlign: "right" //Makes numbers displayed to the right of a column
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "ID",
        accessor: "id",
        style: {
          textAlign: "right"
        },
        width: 100,
        maxWidth: 100,
        minWidth: 100
      },
      {
        Header: "Title",
        accessor: "title",
        sortable: false,
        filterable: false
      },
      {
        Header: "Content",
        accessor: "body",
        sortable: false,
        filterable: false
      },
      { //column to add actions like "delete", "update", and etc
        Header: "Actions",
        Cell: props => {
          return (
            <button style={{ backgroundColor: "red", color: "#fefefe" }}
              onClick={() => {
                // console.log("props", props)
                this.deleteRow(props.original.id);
              }}
            >Delete</button>
          )
        },
        sortable: false,
        filterable: false,
        width: 100,
        maxWidth: 100,
        minWidth: 100
      }
    ]
    return (
      <ReactTable
        columns={columns}
        data={this.state.posts}
        filterable
        defaultPageSize={10}
        // showPaginationTop
        noDataText={"Please wait...!"}
      // showPagination={false}
      >

        {(state, filteredData, instance) => {
          this.reactTable = state.pageRows.map(post => { return post._original });
          return (
            <div>
              {filteredData()}
              <ExportToExcel posts={this.reactTable} />
            </div>
          )
        }}
      </ReactTable>


    );
  }
}

export default App;
