/**
 * Banking Grid
 * Grid with different column types for banking data
 */
Ext.define('reExtAIDemo.view.ai.bankingGrid.DataGrid', {
  extend: 'Ext.grid.Panel',
  xtype: 'banking-grid',
  controller: 'banking-grid-controller',
  title: 'Banking Grid',

  requires: [
    'reExtAIDemo.store.BankingDataStore',
    'reExtAIDemo.view.ai.bankingGrid.DataGridController'
  ],

  plugins: {
    gridfilters: true 
  },

  store: {
    type: 'banking-data-store' 
  },

  features: [{ 
    ftype: 'summary', 
    dock: 'bottom'
  }],

  columns: [
    {
      text: 'Loan ID',
      dataIndex: 'loan_id',
      width: 110,
      tooltip: 'Unique loan identifier',
      filter: { type: 'string' }
    },
    {
      text: 'Borrower',
      dataIndex: 'borrower_name',
      flex: 1,
      minWidth: 160,
      filter: { type: 'string' }
    },
    {
      text: 'Type',
      dataIndex: 'loan_type',
      width: 120,
      filter: { type: 'list' }
    },
    {
      text: 'Principal',
      dataIndex: 'principal_amount',
      width: 140,
      align: 'right',
      xtype: 'numbercolumn',
      format: '$0,0',
      filter: { type: 'number' },
      summaryType: 'sum',
      summaryRenderer: v => Ext.util.Format.currency(v, '$', 0)
    },
    {
      text: 'Rate',
      dataIndex: 'interest_rate',
      width: 90,
      align: 'right',
      filter: { type: 'number' },
      renderer: v => Ext.util.Format.number(v, '0.0') + '%'
    },
    {
      text: 'Remaining',
      dataIndex: 'remaining_balance',
      width: 150,
      align: 'right',
      xtype: 'numbercolumn',
      format: '$0,0',
      filter: { type: 'number' },
      summaryType: 'sum',
      summaryRenderer: v => Ext.util.Format.currency(v, '$', 0)
    },
    {
      text: 'Next Due',
      dataIndex: 'next_payment_due',
      width: 120,
      xtype: 'datecolumn',
      format: 'Y-m-d',
      filter: { type: 'date' }
    },
    {
      text: 'Status',
      dataIndex: 'status',
      width: 110,
      filter: { type: 'list' },
      renderer: (v, m) => {
        if (v === 'Overdue') m.tdStyle = 'color:#c62828;font-weight:600;';
        else if (v === 'Current') m.tdStyle = 'color:#2e7d32;font-weight:600;';
        else if (v === 'Closed') m.tdStyle = 'color:#607d8b;';
        return v;
      }
    }
  ],

  tbar: [
    {
      xtype: 'textfield',
      reference: 'queryField', 
      itemId: 'queryField',
      emptyText: 'e.g. show people that owe more than 5000',
      width: 350,
      listeners: {
        specialkey: 'onQueryEnter' 
      }
    }, {
      xtype: 'button',
      text: 'Search',
      iconCls: 'fa fa-search',
      handler: 'onQueryEnter',
      reference: 'searchButton',
      itemId: 'searchButton',
      tooltip: 'Search'
    }, '->', {
      xtype: 'button',
      iconCls: 'fa fa-ban',
      text: 'Clear Filters',
      reference: 'clearFiltersButton',
      itemId: 'clearFiltersButton',
      handler: 'onClearFiltersClick'
    }
  ]
});
