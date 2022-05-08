import { ITableHeader } from "../interfaces/tableHeader.interface";

export const TABLE_HEADER_BOOKS: ITableHeader[] =
  [
    {
      field: 'author',
      title: 'Author'
    },
    {
      field: 'title',
      title: 'Title'
    },
    {
      field: 'country',
      title: 'Country'
    },
    {
      field: 'year',
      title: 'Year'
    },
  ];
export const TABLE_HEADER_AUTHORS: ITableHeader[] =
  [
    {
      field: 'fullName',
      title: 'Author'
    },
    {
      field: 'country',
      title: 'Country'
    }
  ];

