/**
 * reExtAIDemo.view.ai.simpleGrid.DataGrid
 * Grid component with NL query support for simple data
 */
Ext.define('reExtAIDemo.view.ai.simpleGrid.DataGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'simple-grid',
  controller: 'simple-grid-controller',
  title: 'Simple Data Grid - NL Query',

  requires: [
    'reExtAIDemo.store.SimpleDataStore',
    'reExtAIDemo.view.ai.simpleGrid.DataGridController'
  ],

  plugins: {
    gridfilters: true 
  },

  store: {
    type: 'simple-data-store' 
  },

  columns: [
    { 
      text: 'Name',
      dataIndex: 'name', 
      flex: 1, 
      minWidth: 140, 
      filter: 'string' 
    },
    { 
      text: 'Age', 
      dataIndex: 'age', 
      width: 60, 
      filter: 'number' 
    },
    { 
      text: 'Email', 
      dataIndex: 'email', 
      flex: 1, 
      minWidth: 200, 
      filter: 'string' 
    },
    {
      text: 'Status', 
      dataIndex: 'status', 
      width: 100, 
      filter: {
          type: 'list',
          options: ['active', 'inactive', 'pending']
      },
      renderer: function (value, metaData) {
        let colors = {
          "active": "#396",
          "inactive": "#900",
          "pending": "#990"
        };
        metaData.tdStyle = 'color:' + colors[value];
        return value;
      }
    },
    { 
      text: 'Country', 
      dataIndex: 'country', 
      width: 120, 
      filter: 'string' 
    },
    { 
      text: 'Sales (USD)',
      dataIndex: 'last_month_sales', 
      width: 120, 
      filter: 'number', 
      formatter: 'usMoney' 
    },
    { 
      xtype: 'datecolumn', 
      text: 'Created At', 
      dataIndex: 'created_at', 
      width: 120, 
      filter: 'date', 
      formatter: 'date("Y-m-d")'
    }
  ],

  tbar: [
    {
      xtype: 'textfield',
      reference: 'queryField', 
      itemId: 'queryField',
      emptyText: 'e.g. show active users under 30',
      width: 350,
      listeners: {
        specialkey: 'onQueryEnter' 
      }
    }, 
    {
      xtype: 'button',
      text: 'Search',
      iconCls: 'fa fa-search',
      handler: 'onQueryEnter',
      reference: 'searchButton',
      itemId: 'searchButton',
      tooltip: 'Execute NL query'
    },
    '->',
    {
      xtype: 'button',
      iconCls: 'fa fa-ban',
      text: 'Clear Filters',
      reference: 'clearFiltersButton',
      itemId: 'clearFiltersButton',
      handler: 'onClearFiltersClick'
    }
  ]
});
